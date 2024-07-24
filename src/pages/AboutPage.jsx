import React, { useEffect, useState } from "react";
import "../styles/styles-pages/AboutPage.css";
import DecorativeHeader from "../components/DecorativeHeader";
import generalService from "../services/general.service";

function AboutPage() {
  const [generalData, setGeneralData] = useState(null);

  useEffect(() => {
    generalService
      .getGeneralData()
      .then((result) => {
        console.log(result.data[0]);
        setGeneralData(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <DecorativeHeader />
      {generalData && (
        <div className="page-wrapper about-sections-wrapper flex-column-left">
          <section className="about-section flex-column-left">
            <h1 className="about-headline-left">About</h1>
            <p className="about-text">
              {generalData.about_long_general}
            </p>
          </section>
          <section className="about-section flex-column-left">
            <h1 className="about-headline">
            {generalData.about_headline_top}
            </h1>
            <p className="about-text">
            {generalData.about_long_top}
            </p>
          </section>
          <section className="about-section flex-column-left">
            <h1 className="about-headline">
            {generalData.about_headline_bottom}
            </h1>
            <p className="about-text">
            {generalData.about_long_bottom}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

export default AboutPage;
