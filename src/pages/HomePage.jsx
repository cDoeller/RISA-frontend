import { React, useState, useEffect } from "react";
import "../styles/styles-pages/HomePage.css";
import projectsService from "../services/projects.service";
import { Link } from "react-router-dom";

function HomePage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    projectsService
      .getAllProjects()
      .then((result) => {
        console.log(result.data);
        setProjects(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-wrapper">
      {projects && (
        <div className="projects-list-projects-wrapper flex-column">
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
        </div>
      )}
    </div>
  );
}

export default HomePage;
