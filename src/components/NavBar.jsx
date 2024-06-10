import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const [showNav, setShowNav] = useState(false);
  const {pathname} = useLocation();

  const handleNavButtons = () => {
    setShowNav(!showNav);
  };

  return (
    <nav>
      <div className="nav-top-wrapper">
        <div className="nav-ci-wrapper">
          <Link to="/">
            <div className="nav-ci-logo-wrapper">
              <img src="/logo.png" alt="" />
            </div>
          </Link>
          <h1>Research Institute for Speculative Atmospheres</h1>
        </div>
        <div className="nav-burger-wrapper" onClick={handleNavButtons}>
          <img src={showNav ? "/burger-x.png" : "/burger.png"} alt="" />
        </div>
      </div>
      {showNav && (
        <div className="nav-bottom-wrapper">
          <Link to="/about" onClick={handleNavButtons}>
            <h1 className={"nav-bottom-h1 " + (pathname==="/about"?"border-bottom-white":"border-bottom-black")}>About</h1>
          </Link>
          <Link to="#" onClick={handleNavButtons}>
            <h1 className={"nav-bottom-h1 " + (pathname==="/projects"?"border-bottom-white":"border-bottom-black")}>Projects</h1>
          </Link>
          <Link to="#" onClick={handleNavButtons}>
            <h1 className={"nav-bottom-h1 " + (pathname==="/contributors"?"border-bottom-white":"border-bottom-black")}>Contributors</h1>
          </Link>
          <Link to="/contact" onClick={handleNavButtons}>
            <h1 className={"nav-bottom-h1 " + (pathname==="/contact"?"border-bottom-white":"border-bottom-black")}>Contact</h1>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
