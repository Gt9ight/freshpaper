import React, { useState, useRef } from "react";
import { db, storage } from "../utilis/Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MediaFeed from "../feed/MediaFeed";
import imageCompression from "browser-image-compression";
import "./MediaPost.css";

const MediaPost = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleMediaChange = (e) => {
    setMedia([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() || media.length > 0) {
      setUploading(true);
      const compressedFiles = await compressImages(media);
      const mediaUrls = await uploadMediaFiles(compressedFiles);
      await savePostToFirestore(text.trim(), mediaUrls);
      setText("");
      setMedia([]);
      fileInputRef.current.value = "";
      setUploading(false);
    }
  };

  const compressImages = async (files) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800, 
      useWebWorker: true,
    };

    const compressedFilesPromises = files.map(async (file) => {
      try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
      } catch (error) {
        console.error("Error while compressing the image:", error);
        return file;
      }
    });

    return Promise.all(compressedFilesPromises);
  };

  const uploadMediaFiles = async (files) => {
    const promises = files.map((file) => {
      const storageRef = ref(storage, `mediaposts/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          }
        );
      });
    });

    return Promise.all(promises);
  };

  const savePostToFirestore = async (text, mediaUrls) => {
    const postRef = collection(db, "mediaposts");
    await addDoc(postRef, {
      text,
      mediaUrls,
      createdAt: Timestamp.now(),
    });
  };

  return (
    <div className="media-post-container">
      <form className="media-post-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write something..."
          value={text}
          onChange={handleTextChange}
        />
        <input
          type="file"
          onChange={handleMediaChange}
          accept="image/*,video/*"
          multiple
          ref={fileInputRef}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Posting..." : "Post"}
        </button>
      </form>
      
      <MediaFeed />
    </div>
  );
};

export default MediaPost;
