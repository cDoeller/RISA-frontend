import React, { useState } from "react";
import "../styles/styles-components/NewsContainer.css";

function NewsContainer(props) {
  const { newsData } = props;
  const [isActive, setIsActive] = useState(false);

  const newsInfoElement = (
    <div className="newscontainer-info-wrapper flex-column">
      {newsData.image_url && (
        <div className="fill-image newscontainer-image-wrapper">
          <img src={newsData.image_url} alt="" />
        </div>
      )}
      <p className="newscontainer-info-element">{newsData.description}</p>
    </div>
  );

  function handleNewsClick() {
    setIsActive(!isActive);
  }

  return (
    <div
      className={
        "newscontainer-wrapper " + (isActive && "newscontainer-wrapper-active")
      }
    >
      <div
        onClick={handleNewsClick}
        className={
          "newscontainer-header-wrapper flex-row pointer " +
          (isActive && "newscontainer-header-wrapper-active")
        }
      >
        <div className="newscontainer-date-wrapper">
          {/* <div className="image-wrapper">
          <img src="" alt="" />
        </div> */}
          <p className="newscontainer-date">
            {newsData.date.replaceAll("-", "/")}
          </p>
        </div>
        <div className="newscontainer-title-wrapper">
          <p className="newscontainer-title">{newsData.title}</p>
        </div>
      </div>
      {isActive && newsInfoElement}
    </div>
  );
}

export default NewsContainer;
