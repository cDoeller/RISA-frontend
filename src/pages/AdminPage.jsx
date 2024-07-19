import { React, useContext } from "react";
import "../styles/styles-pages/AdminPage.css";
import { AuthContext } from "../context/auth.context";
import Login from "../components/Login";
import AdminDataBlock from "../components/AdminDataBlock";
import { Link } from "react-router-dom";

function AdminPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
          {/* GENERAL DATA */}
          <section className="admin-general-data-section flex-column">
            <Link to="/admin/general-data">
              <div className="admin-general-data-wrapper">
                <h1 className="admin-general-data-headline">general data</h1>
              </div>
            </Link>
          </section>
          {/* DATA BLOCKS */}
          <AdminDataBlock
            headline="Projects"
            createPath="/admin/create-project"
          />
          <AdminDataBlock
            headline="Contributors"
            createPath="/admin/create-contributor"
          />
          <AdminDataBlock headline="News" createPath="/admin/create-news" />
        </div>
      )}
    </>
  );
}

export default AdminPage;
