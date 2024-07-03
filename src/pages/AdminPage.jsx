import { React, useContext } from "react";
import "../styles/styles-pages/AdminPage.css";
import { AuthContext } from "../context/auth.context";
import Login from "../components/Login";
import AdminDataBlock from "../components/AdminDataBlock";

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
          {/* DATA BLOCKS */}
          <AdminDataBlock
            headline="Projects"
            createPath="/admin/create-project"
          />
          <AdminDataBlock
            headline="Contributors"
            createPath="/admin/create-contributor"
          />
        </div>
      )}
    </>
  );
}

export default AdminPage;
