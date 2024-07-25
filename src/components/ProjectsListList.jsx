import React from "react";
import { Link } from "react-router-dom";

function ProjectsListList(props) {
  const { projects } = props;
  return (
    <>
      {projects.map((project) => {
        return (
          <Link to={`/projects/${project._id}`} key={project._id}>
            <div className="projects-list-card-wrapper flex-column-left pointer">
              <h1 className="projects-list-card-title">{project.title}, {project.year}</h1>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ProjectsListList;
