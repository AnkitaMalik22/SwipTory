import React from "react";
import './StorySlider.css';
import { useSelector } from "react-redux/es/hooks/useSelector";

const Slide = ({ slides, imgIndex }) => {
  const {isSmallScreen} = useSelector((state) => state.layout);
  return (
    <div className="slides" style={{ width: "100%",height:'100%' }}>
      {slides && slides.map((slide, index) => (
        <>
        <img
          className="slide_image"
          key={slide._id}
          style={{ display: index === imgIndex ? "block" : "none", width: "100%", height: isSmallScreen ? '100vh' : "90vh" }}
          src={slide?.imageUrl}
          alt={`Slide ${index}`}
        />
      <div className="slide_text" style={{ display: index === imgIndex ? "block" : "none" }} >
          <h1 className="slide_heading">{slide?.heading}</h1>
          <p className="slide_p">{slide?.description}</p>
        </div>
        </>
      ))}
    </div>
  );
};

export default Slide;
