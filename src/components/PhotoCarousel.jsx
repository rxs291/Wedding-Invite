import { useState, useEffect } from 'react';

export default function PhotoCarousel() {
  const images = [
    '/images/pic1.jpg',
    '/images/pic5.jpg',
    '/images/pic3.jpg',
    '/images/pic4.jpg'
  ];

  const [current, setCurrent] = useState(0);

  // Auto-fade every few seconds (optional!)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const showPrev = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <div className="carousel">
      <button className="prev" onClick={showPrev}>&#10094;</button>

      <div className="carousel-images">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={index === current ? 'active' : ''}
          />
        ))}
      </div>

      <button className="next" onClick={showNext}>&#10095;</button>
    </div>
  );
}
