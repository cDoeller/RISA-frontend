import { ExternalLink } from "react-external-link";
import ScrollToTop from "react-scroll-to-top";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/styles-pages/ProjectDetailsPage.css";
import projectsService from "../services/projects.service";

function ProjectDetailsPage() {
  const [projectData, setProjectData] = useState(null);
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

  return (
    <>
      {projectData && (
        <>
          {/* IMG 1 */}
          <div className="image-wrapper">
            <img src={projectData.images_url[0]} alt="" />
          </div>
          <section className="project-details-info-wrapper flex-column page-wrapper">
            {/* TITLE */}
            <h1>
              {projectData.title +
                ", " +
                (projectData.year ? projectData.year : "")}
            </h1>
            {/* CONTRIB */}
            {projectData.contributors.length > 0 && (
              <div className="project-details-info-contributors flex-row-wrap">
                {projectData.contributors.map((c, index) => {
                  return (
                    <p key={c._id}>
                      {c.name}
                      {index !== projectData.contributors.length - 1 ? "," : ""}
                    </p>
                  );
                })}
              </div>
            )}
            {/* DESCRIPTION */}
            <p className="project-details-info-description">
              {projectData.description}
            </p>
            {/* WEBSITE */}
            {projectData.link && (
              <ExternalLink href={projectData.link}>
                <p className="project-details-info-link">Website</p>
              </ExternalLink>
            )}
            {/* TAGS */}
            {projectData.tags.length && (
              <div className="project-details-info-tags-container flex-row-wrap">
                {projectData.tags.map((tag) => {
                  return (
                    <div
                      className="project-details-info-tags-tagcontainer"
                      key={tag}
                    >
                      <p>{tag}</p>
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
            {/* IMAGES */}
            <div className="flex-column project-details-info-images-container">
              {projectData.images_url.length > 1 &&
                projectData.images_url.map((img) => {
                  return (
                    <div key={img} className="image-wrapper">
                      <img src={img} alt="" />
                    </div>
                  );
                })}
            </div>
            {/* UMBRELLA PROJECT */}
            {!projectData.is_umbrella_project &&
              projectData.umbrella_project && (
                <div className="flex-column project-details-info-related-container">
                  <p className="project-details-info-related-container-headline">
                    Umbrella Project:
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
