import { React, useState, useEffect } from "react";
import "../styles/styles-pages/HomePage.css";
import projectsService from "../services/projects.service";

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
      {projects &&
        projects.map((project) => {
          return (
            <div
              className="projects-page-card-wrapper flex-column-left pointer"
              key={project._id}
            >
              <h1 className="projects-page-card-title">{project.title}</h1>
              <div className="image-wrapper">
                <img src={project.images_url[0]} alt="" />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default HomePage;
