import React, { useState, useEffect } from "react";
import { db } from "../utilis/Firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import "./home.css";
import globe from '../mediaPost/regulareEarth.png'
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const postsCollection = collection(db, "mediaposts");
    const q = query(postsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="media-feed">
      <div className="header">
        <h1 className="daily-bugle-titleFeed"> 
          <span className="skew-textFeed">FRESH</span> 
          {/* Globe Image as Login Button */}
          <img 
            src={globe} 
            alt="Globe" 
            className="globe-imageFeed login-globe" 
            onClick={() => navigate("/auth")} 
          /> 
          <span className="skew-textFeed">PAPER</span>
        </h1>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="media-post">
          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <Carousel images={post.mediaUrls} />
          )}
          {post.text && <p>{post.text}</p>}
        </div>
      ))}
    </div>
  );
}

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      {images.length > 1 && (
        <button className="carousel-btn prev" onClick={handlePrev}>
          ‹
        </button>
      )}

      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />

      {images.length > 1 && (
        <button className="carousel-btn next" onClick={handleNext}>
          ›
        </button>
      )}

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Home;