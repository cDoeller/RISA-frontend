import { React, useState, useEffect, useContext } from "react";
import "../styles/styles-pages/AdminPage.css";
import projectsService from "../services/projects.service";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.services";

function AdminPage() {
  const [projects, setProjects] = useState(null);

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    projectsService
      .getAllProjects()
      .then((result) => {
        // console.log(result.data);
        setProjects(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-wrapper">
      <section className="admin-project-section flex-column-left">
        <div className="admin-search-wrapper flex-row-left">
          <label className="admin-label flex-row">
            Projects
            <input className="admin-input" type="text" />
          </label>
          <div className="admin-add-button image-wrapper pointer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/54/54570.png"
              alt=""
            />
          </div>
        </div>
        <div className="admin-list-container flex-column-left">
          {projects &&
            projects.map((project) => {
              return (
                <div key={project._id} className="admin-card-wrapper pointer">
                  <h1 className="admin-card-title">
                    {project.title}, {project.year}
                  </h1>
                  {project.contributors.length > 0 && (
                    <p className="admin-card-subtitle">bla</p>
                  )}
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
