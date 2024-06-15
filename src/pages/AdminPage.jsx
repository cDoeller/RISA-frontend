import { React, useState, useEffect, useContext } from "react";
import "../styles/styles-pages/AdminPage.css";
import projectsService from "../services/projects.service";
import contributorsService from "../services/contributors.service";
import { AuthContext } from "../context/auth.context";
import Login from "../components/Login";
import { Link } from "react-router-dom";
import AdminDataBlock from "../components/AdminDataBlock";

function AdminPage() {
  const [projects, setProjects] = useState(null);
  const [contributors, setContributors] = useState(null);

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    projectsService
      .getAllProjects()
      .then((result) => {
        // console.log(result.data);
        setProjects(result.data);
        return contributorsService.getAllContributors();
      })
      .then((result) => {
        // console.log(result.data);
        setContributors(result.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    logOutUser();
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <div className="admin-page-wrapper page-wrapper flex-column">
          <div className="admin-login-info flex-row">
            <p className="admin-login-info-text">
              Logged in as <u>{user.name}</u>
            </p>
            <p onClick={handleLogout} className="admin-login-info-text pointer">
              X
            </p>
          </div>

          {/* DATA BLOCKS */}
          {projects && (
            <AdminDataBlock
              headline="Projects"
              data={projects}
              setData={setProjects}
              createPath="/admin/create-project"
            />
          )}
          {contributors && (
            <AdminDataBlock
              headline="Contributors"
              data={contributors}
              setData={setContributors}
              createPath="/admin/create-project"
            />
          )}
        </div>
      )}
    </>
  );
}

export default AdminPage;
