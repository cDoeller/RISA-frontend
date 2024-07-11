import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import "../styles/styles-components/ContributorCard.css";

function ContributorCard(props) {
  const { contributor } = props;
  const [showInfos, setShowInfos] = useState(false);

  const handleShowInfos = () => {
    setShowInfos(!showInfos);
  };

  return (
    <div className={(showInfos ? "contributor-wrapper-active" : "contributor-wrapper")}>
      <div
        className={
          "pointer " +
          (showInfos ? "contributors-card-active" : "contributors-card")
        }
        onClick={handleShowInfos}
      >
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
              {contributor.projects.map((p, index) => {
                return (
                  <Link className="white" key={p._id} to={`/projects/${p._id}`}>
                    <span className="contributors-card-inofs-projects-link white underline pointer">
                      {p.title}
                    </span>
                    {index !== contributor.projects.length - 1 && ", "}
                  </Link>
                );
              })}
            </p>
          )}
          <div className="white contributors-card-inofs-some-wrapper">
            {contributor.social_media.insta && (
              <p className="white contributors-card-inofs-some-link">
                instagram:{" "}
                <ExternalLink
                  href={
                    "https://www.instagram.com/" +
                    contributor.social_media.insta
                  }
                  className="white underline pointer"
                >
                  @{contributor.social_media.insta}
                </ExternalLink>
              </p>
            )}
            {contributor.social_media.x && (
              <p className="white contributors-card-inofs-some-link">
                x:{" "}
                <ExternalLink
                  href={"https://www.x.com/" + contributor.social_media.x}
                  className="white underline pointer"
                >
                  @{contributor.social_media.x}
                </ExternalLink>
              </p>
            )}
          </div>
          {contributor.website_url && (
            <ExternalLink
              className="white contributors-card-inofs-some-website underline"
              href={contributor.website_url}
            >
              {contributor.website_url.replace("https://", "")}
            </ExternalLink>
          )}
        </div>
      )}
    </div>
  );
}

export default ContributorCard;
