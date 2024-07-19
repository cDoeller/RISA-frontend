import React, { useState } from "react";
import "../styles/styles-components/NewsContainer.css";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

function NewsContainer(props) {
  const { newsData, active, index } = props;
  const [isActive, setIsActive] = useState(active);

  const newsInfoElement = (
    <div className="newscontainer-info-wrapper flex-column">
      {newsData.image_url && (
        <div className="fill-image newscontainer-image-wrapper">
          <img src={newsData.image_url} alt="" />
        </div>
      )}
      <div className="newscontainer-info-inner-wrapper flex-column">
        <p className="newscontainer-info-element white">
          {newsData.description}
        </p>
        {newsData.is_event &&
          (newsData.end_date ? (
            <p className="newscontainer-info-element white">
              Date: {newsData.date.replaceAll("-", "/")} -{" "}
              {newsData.end_date.replaceAll("-", "/")}
            </p>
          ) : (
            <p className="newscontainer-info-element white">
              Date: {newsData.date.replaceAll("-", "/")}
            </p>
          ))}
        {newsData.related_projects && (
          <div className="newscontainer-info-related-wrapper flex-row-wrap">
            <p className="white">Related Projects:&nbsp;</p>
            {newsData.related_projects.map((proj, index) => {
              return (
                <Link to={`/projects/${proj._id}`} key={proj._id}>
                  <p className="white pointer">
                    <u>{proj.title}</u>
                    {index !== newsData.related_projects.length - 1 && ","}
                    <>&nbsp;</>
                  </p>
                </Link>
              );
            })}
          </div>
        )}
        {newsData.link && (
          <ExternalLink href={newsData.link}>
            <p className="newscontainer-info-element white pointer">
              <u>{newsData.link}</u>
            </p>
          </ExternalLink>
        )}
      </div>
    </div>
  );

  function handleNewsClick() {
    setIsActive(!isActive);
  }

  return (
    <div
      className={
        "newscontainer-wrapper " +
        (isActive &&
          (index === 0
            ? "newscontainer-wrapper-active-firstchild"
            : "newscontainer-wrapper-active"))
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
            {newsData.createdAt.slice(0, 10).replaceAll("-", "/")}
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
