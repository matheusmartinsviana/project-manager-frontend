import React, { useState, useEffect } from "react";
import styles from "./Styles/SimpleSlider.module.css"; // Importando o CSS como módulo
const SimpleSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Muda o slide automaticamente a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContent}>
        <img
          src={slides[currentSlide].src}
          alt="Slide"
          width={slides[currentSlide].width}
          height={slides[currentSlide].height}
          className={styles.sliderImage}
        />
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].description}</p>
      </div>

      {/* <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div> */}
    </div>
  );
};

export default SimpleSlider;
