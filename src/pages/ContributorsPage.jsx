import React, { useState, useEffect } from "react";
import "../styles/styles-pages/ContributorsPage.css";
import contributorsService from "../services/contributors.service";
import ContributorCard from "../components/ContributorCard";

function ContributorsPage() {
  const [contributors, setContributors] = useState(null);

  useEffect(() => {
    contributorsService
      .getAllContributors()
      .then((result) => {
        // console.log(result.data);
        setContributors(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-wrapper">
      <section className="contributors-section flex-column">
        {contributors &&
          contributors.map((c) => {
            return <ContributorCard key={c._id} contributor={c} />;
          })}
      </section>
    </div>
  );
}

export default ContributorsPage;
