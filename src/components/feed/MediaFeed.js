import React, { useState, useEffect, useRef, useCallback } from "react";
import { db } from "../utilis/Firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import "./Mediafeed.css";
import globe from '../mediaPost/regulareEarth.png';
import LazyLoad from 'react-lazyload'; // Import lazy load

function MediaFeed() {
    const [posts, setPosts] = useState([]);

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

const Carousel = React.memo(({ images }) => { // Memoize the Carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageRefs = useRef([]);

    useEffect(() => {
        imageRefs.current = images.map(() => React.createRef());
    }, [images]);

    const handleNext = useCallback(() => { // Use useCallback
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    const handlePrev = useCallback(() => { // Use useCallback
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    return (
        <div>
            <div className="carousel">
                {images.length > 1 && (
                    <button className="carousel-btn prev" onClick={handlePrev}>
                        ‹
                    </button>
                )}

                <LazyLoad height={300} once placeholder={<img src={globe} alt="Loading..." />}>
                    <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        ref={imageRefs.current[currentIndex]}
                    />
                </LazyLoad>

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
        </div>
    );
});

export default MediaFeed;