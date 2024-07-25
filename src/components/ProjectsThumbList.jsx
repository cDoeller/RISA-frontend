import React from "react";
import { Link } from "react-router-dom";

function ProjectsThumbList(props) {
  const { projects } = props;
  return (
    <>
      {projects.map((project) => {
        return (
          <Link to={`/projects/${project._id}`} key={project._id}>
            <div className="projects-list-card-wrapper flex-column-left pointer">
              <div className="projects-list-card-image-wrapper fill-image">
                <img src={project.images_url[0]} alt="" />
              </div>
              <h1 className="projects-list-card-title">{project.title}</h1>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ProjectsThumbList;
