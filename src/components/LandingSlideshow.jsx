import React, { useState } from "react";
import "../styles/styles-components/LandingSlideshow.css";

function LandingSlideshow(props) {
  const { slideshowData } = props;
  const [index, setIndex] = useState(0);

  function handleSlider(direction) {
    switch (direction) {
      case "right":
        if (index !== slideshowData.length-1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
        break;
      case "left":
        if (index !== 0) {
          setIndex(index - 1);
        } else {
          setIndex(slideshowData.length-1);
        }
        break;
    }
  }

  return (
    <div className="landing-page-image-section-wrapper flex-column">
      <div className="landing-page-image-section-image-wrapper fill-image ">
        <img src={slideshowData[index].image_url} alt="" />
      </div>
      <div className="landing-page-image-gallerytools-wrapper flex-row-center">
        <div
          className="image-wrapper landing-page-image-gallerytools-arrow pointer"
          onClick={() => {
            handleSlider("left");
          }}
        >
          <img src="/arrow-left.png" alt="" />
        </div>
        <p className="landing-page-image-gallerytools-info">
        {slideshowData[index].caption}
        </p>
        <div
          className="image-wrapper landing-page-image-gallerytools-arrow pointer"
          onClick={() => {
            handleSlider("right");
          }}
        >
          <img src="/arrow-right.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LandingSlideshow;
