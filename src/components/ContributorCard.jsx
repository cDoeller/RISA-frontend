import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles-components/ContributorCard.css";

function ContributorCard(props) {
  const { contributor } = props;
  const [showInfos, setShowInfos] = useState(false);

  const handleShowInfos = () => {
    setShowInfos(!showInfos);
  };

  return (
    <>
      <div className="contributors-card pointer" onClick={handleShowInfos}>
        {contributor.name}
      </div>
      {showInfos && (
        <div className="contributors-card-inofs-wrapper flex-column">
          <p className="white contributors-card-inofs-bio">
            {contributor.short_bio}
          </p>
          {contributor.projects && (
            <p className="white contributors-card-inofs-projects">
              Related Projects:{" "}
              {contributor.projects.map((p) => {
                return p.title;
              })}
            </p>
          )}
          <div className="white contributors-card-inofs-some-wrapper">
            {contributor.social_media.insta && (
              <p className="white contributors-card-inofs-some-link">
                insta: {contributor.social_media.insta}
              </p>
            )}
            {contributor.social_media.x && (
              <p className="white contributors-card-inofs-some-link">
                x: {contributor.social_media.x}
              </p>
            )}
          </div>
          {contributor.website_url && (
              <Link
                className="white contributors-card-inofs-some-website"
                to={contributor.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contributor.website_url}
              </Link>
          )}
        </div>
      )}
    </>
  );
}

export default ContributorCard;
