import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const [showNav, setShowNav] = useState(false);

  const handleNavButtons = () => {
    setShowNav(!showNav);
  };

  return (
    <nav>
      <div className="nav-top-wrapper">
        <div className="nav-ci-wrapper">
          <div className="nav-ci-logo-wrapper">
            <img src="/logo.png" alt="" />
          </div>
          <h1>Research Institute for Speculative Atmospheres</h1>
        </div>
        <div className="nav-burger-wrapper" onClick={handleNavButtons}>
          <img src={showNav ? "/burger-x.png" : "/burger.png"} alt="" />
        </div>
      </div>
      {showNav && (
        <div className="nav-bottom-wrapper">
          <Link to="#" onClick={handleNavButtons}>
            <h1 className="nav-bottom-h1">About</h1>
          </Link>
          <Link to="#" onClick={handleNavButtons}>
            <h1 className="nav-bottom-h1">Projects</h1>
          </Link>
          <Link to="#" onClick={handleNavButtons}>
            <h1 className="nav-bottom-h1">Contributors</h1>
          </Link>
          <Link to="#" onClick={handleNavButtons}>
            <h1 className="nav-bottom-h1">Contact</h1>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
