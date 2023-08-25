import React from "react";
import "./StorySlider.css";


const Progress = ({ images, progressBars }) => {


  return (
    <div
      className={`progress-container`}
    >
      {progressBars &&
        progressBars.map((bar) => (
          <div
            key={bar.id}
            className="progress-bar"
            style={{
              width: images
                ? images.length === 1
                  ? "100%"
                  : `${100 / (images.length - 1)}%`
                : "0%",
            }}
          >
            <div
              className={`progress ${bar.completed ? "completed" : ""}`}
              style={{ width: `${bar.progress}%` }}
            ></div>
            {bar.progress === 0 && (
              <img
                src={bar.image}
                alt={`Image ${bar.id}`}
                width={600}
                height={600}
                className="img"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Progress;
