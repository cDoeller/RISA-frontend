import { ExternalLink } from "react-external-link";
import ScrollToTop from "react-scroll-to-top";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/styles-pages/ProjectDetailsPage.css";
import projectsService from "../services/projects.service";
import PopUp from "../components/PopUp";

function ProjectDetailsPage() {
  const [projectData, setProjectData] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    projectsService
      .getProject(id)
      .then((result) => {
        console.log(result.data);
        setProjectData(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (showDescription) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showDescription]);

  const handleDescriptionClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <>
      {projectData && (
        <>
          {/* DESCRIPTION POPUP */}
          {showDescription && (
            <PopUp
              title={projectData.title}
              content={projectData.description}
              closeSetter={setShowDescription}
            />
          )}
          {/* HEADER IMAGE */}
          <div className="fill-image project-details-header-image">
            <img src={projectData.images_url[0]} alt="" />
          </div>
          <section className="project-details-info-wrapper flex-column page-wrapper">
            {/* TAGS */}
            {projectData.tags.length && (
              <div className="project-details-info-tags-container flex-row-center flex-wrap">
                {projectData.tags.map((tag) => {
                  return (
                    <div
                      className="project-details-info-tags-tagcontainer"
                      key={tag}
                    >
                      <p className="project-details-info-tags">{tag}</p>
                    </div>
                  );
                })}
              </div>
            )}
            {/* TITLE */}
            <div className="flex-column-center">
              <h1>{projectData.title}</h1>
              {projectData.year ? <h1>{projectData.year}</h1> : ""}
            </div>

            {/* ABSTRACT + LINKS */}
            <div className="flex-column project-details-info-description-abstract-wrapper">
              <p className="project-details-info-abstract">
                {projectData.abstract}
              </p>
              {/* POPUP LINKE */}
              <div className="project-details-info-info-buttons-container flex-row">
                <p
                  className="button-fit-content-small pointer project-details-info-link"
                  onClick={handleDescriptionClick}
                >
                  more info
                </p>
                {/* LINK */}
                {projectData.link && (
                  <ExternalLink href={projectData.link}>
                    <div className="flex-row-align-center button-fit-content-small project-details-info-link-container">
                      <div className="image-wrapper external-link-wrapper">
                        <img src="/external-link-icon.png" alt="" />
                      </div>
                      <p className="project-details-info-link">
                        project website
                      </p>
                    </div>
                  </ExternalLink>
                )}
              </div>
            </div>
            {/* CONTRIB */}
            {projectData.contributors.length > 0 && (
              <div className="project-details-info-contributor-wrapper flex-row flex-wrap">
                Contributors:
                {projectData.contributors.map((c, index) => {
                  return (
                    <Link key={c._id} to="#">
                      <p className="pointer project-details-info-contributor">
                        {c.name}
                        {/* {index !== projectData.contributors.length - 1 ? "  " : ""} */}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* IMAGES */}
            {projectData.images_url.length > 1 && (
              <div className="flex-column project-details-info-images-container">
                {projectData.images_url.map((img) => {
                  return (
                    <div key={img} className="image-wrapper">
                      <img src={img} alt="" />
                    </div>
                  );
                })}
              </div>
            )}

            {/* RELATED PROJECTS */}
            {projectData.is_umbrella_project && (
              <div className="flex-column project-details-info-related-container">
                <p className="project-details-info-related-container-headline">
                  Related Projects:
                </p>
                {projectData.related_projects.map((p) => {
                  return (
                    <Link
                      to={`/projects/${p._id}`}
                      key={p._id}
                      className="project-details-info-related-card"
                    >
                      <div className="image-wrapper">
                        <img src={p.images_url[0]} alt="" />
                      </div>
                      <h1 className="project-details-info-related-card-title">
                        {p.title}
                      </h1>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* UMBRELLA PROJECT */}
            {!projectData.is_umbrella_project &&
              projectData.umbrella_project && (
                <div className="flex-column project-details-info-related-container">
                  <p className="project-details-info-related-container-headline">
                    Associated Research Project:
                  </p>
                  <Link
                    to={`/projects/${projectData.umbrella_project._id}`}
                    className="project-details-info-related-card"
                  >
                    <div className="image-wrapper">
                      <img
                        src={projectData.umbrella_project.images_url[0]}
                        alt=""
                      />
                    </div>
                    <h1 className="project-details-info-related-card-title">
                      {projectData.umbrella_project.title}
                    </h1>
                  </Link>
                </div>
              )}
            {/* UP ARROW */}
            {/* https://www.npmjs.com/package/react-scroll-to-top */}
            <div className="scroll-to-top-container flex-row-center">
              <ScrollToTop className="scroll-to-top" smooth />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default ProjectDetailsPage;
