import React, { useState, useEffect } from "react";
import "../styles/styles-pages/ContributorsPage.css";
import contributorsService from "../services/contributors.service";
import ContributorCard from "../components/ContributorCard";
import DecorativeHeader from "../components/DecorativeHeader";

function ContributorsPage() {
  const [contributors, setContributors] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    contributorsService
      .getContributorsByName(searchQuery)
      .then((result) => {
        console.log(result.data);
        setContributors(result.data);
      })
      .catch((err) => console.log(err));
  }, [searchQuery]);

  return (
    <>
      {/* HEADER */}
      <DecorativeHeader />
      <div className="page-wrapper contributors-page-wrapper flex-column">
        {/* SEARCH CONTRIBUTOR */}
        <section className="contributors-search-wrapper">
          <label className="contributors-search-label flex-row">
            Search
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="contributors-search-input"
            />
          </label>
        </section>

        {/* CONTRIBUTORS */}
        <section className="contributors-section flex-column">
          {contributors &&
            contributors.map((c) => {
              return <ContributorCard key={c._id} contributor={c} />;
            })}
        </section>
      </div>
    </>
  );
}

export default ContributorsPage;
