import React from "react";
import "../styles/styles-components/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-wrapper flex-column-center">
      <div className="footer-project-info flex-column-center">
        <p className="footer-project-info-p">
          An Artistic Research Project by Christian Doeller
        </p>
        <p className="footer-project-info-p">
          Copyright 2024 @ the <Link to="#">contributors</Link>
        </p>
      </div>

      <div className="footer-socialmedia flex-column-center">
        <p className="footer-follow-p">follow us on</p>
        <button className="footer-follow-button button">instagram</button>
      </div>

      <ul className="footer-legal-ul flex-row-center pointer">
        <Link to="#">
          <li className="footer-legal-li">imprint</li>
        </Link>
        <Link to="#">
          <li className="footer-legal-li">data</li>
        </Link>
        <Link to="#">
          <li className="footer-legal-li">contact</li>
        </Link>
        <Link to="#">
          <li className="footer-legal-li">FAQ</li>
        </Link>
      </ul>
    </div>
  );
}

export default Footer;
