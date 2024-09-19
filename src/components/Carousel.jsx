/* eslint-disable react/prop-types */
import { useState } from "react";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPerPage = 4;

  const moveCarousel = (direction) => {
    if (direction === "prev") {
      setCurrentIndex(
        currentIndex === 0
          ? Math.ceil(children.length / cardsPerPage) - 1
          : currentIndex - 1
      );
    } else if (direction === "next") {
      setCurrentIndex(
        currentIndex === Math.ceil(children.length / cardsPerPage) - 1
          ? 0
          : currentIndex + 1
      );
    }
  };

  return (
    <div className="flex items-center gap-4 px-3">
      <button onClick={() => moveCarousel("prev")}>
        <img src="/images/back.png" alt="" />
      </button>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
            width: `${(children.length / cardsPerPage) * 100}%`,
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-max flex-shrink-0 p-2">
              {child}
            </div>
          ))}
        </div>
      </div>
      <button className="rotate-180" onClick={() => moveCarousel("next")}>
        <img src="/images/back.png" alt="" />
      </button>
    </div>
  );
};

export default Carousel;
