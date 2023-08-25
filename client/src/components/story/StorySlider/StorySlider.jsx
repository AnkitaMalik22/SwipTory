import React, { useState, useEffect } from "react";
import "./StorySlider.css";
import Progress from "./Progress";
import Slide from "./Slide";
import reloadImg from "../../../assets/reload (1).png";
import { useSelector } from "react-redux";
import arrow from "../../../assets/arrow.png";

const StorySlider = ({ slides }) => {
  const [reload, setReload] = useState(false);
  const { isSmallScreen } = useSelector((state) => state.layout);

  const images = slides && slides.map((slide) => slide.imageUrl);

  const progress = images && images.map((_, index) => {
      return { id: index, progress: 0, image: images[index], completed: false };
    });

  const [progressBars, setProgressBars] = useState(progress);
  const [imgIndex, setImgIndex] = useState(0);

  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      updateProgress(imgIndex);
    }, 50);

    return () => clearInterval(interval);
  }, [imgIndex, images]);

  const updateProgress = (barIndex) => {
    setProgressBars((prevProgressBars) => {
      const newProgressBars = [...prevProgressBars];
      newProgressBars[barIndex].progress += 0.5;

      if (newProgressBars[barIndex].progress >= 100) {
        newProgressBars[barIndex].progress = 0;
        newProgressBars[barIndex].completed = true;

        if (barIndex !== images.length - 1) {
          setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
          newProgressBars[barIndex + 1].completed = false;
        } else {
          clearInterval(interval);
        }
      }
      return newProgressBars;
    });
  };

  const handleBtns = (value) => {
    setProgressBars(progress);
    progressBars[imgIndex].progress = 0;

    if (value === "next") {
      if (reload) {
        setImgIndex(0);
      }
      if (imgIndex === images.length - 1) {
        setReload(!reload);
      } else {
        setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    } else {
      if (imgIndex === 0) {
        setImgIndex(0);
      } else {
        setImgIndex((prevIndex) => (prevIndex - 1) % images.length);
      }
    }

    updateProgress(imgIndex);
  };

 

  return (
    <div
      className={`imageSlider`}>


      <div className={`buttons `}>
        <button className="prev-btn" onClick={() => handleBtns("prev")}>
          <img
            src={arrow}
            alt="<"
            style={{
              transform: "rotate(180deg)",
              width: isSmallScreen ? "1rem" : "1.5rem",
            }}
          />
        </button>
        <button className="next-btn" onClick={() => handleBtns("next")}>
          {reload ? (
            <img src={reloadImg} alt="reload" />
          ) : (
            <img
              src={arrow}
              alt=">"
              style={{ width: isSmallScreen ? "1rem" : "1.5rem" }}
            />
          )}
        </button>
      </div>

{/* ----------------------------------  PROGRESS BAR ------------------------------------------------- */}

      <Progress images={images} progressBars={progressBars} />

{/* ------------------------------------- IMAGE SLIDER ----------------------------------------------- */}

      <Slide slides={slides} imgIndex={imgIndex} />
    </div>
  );
};

export default StorySlider;
