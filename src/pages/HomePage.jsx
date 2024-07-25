import { React, useState, useEffect } from "react";
import "../styles/styles-pages/HomePage.css";
import projectsService from "../services/projects.service";
import newsService from "../services/news.service";
import generalService from "../services/general.service";
import { Link } from "react-router-dom";
import TagFilterButton from "../components/TagFilterButton";
import NewsContainer from "../components/NewsContainer";
import LandingSlideshow from "../components/LandingSlideshow";
import ProjectsThumbList from "../components/ProjectsThumbList";
import ProjectsListList from "../components/ProjectsListList";

function HomePage() {
  const [projects, setProjects] = useState(null);
  const [activeFilterTags, setActiveFilterTags] = useState([]);
  const [latestNews, setLatestNews] = useState(null);
  const [generalData, setGeneralData] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const latestNewsFetch = await newsService.getLatestNews();
        setLatestNews(latestNewsFetch.data);
        const generalData = await generalService.getGeneralData();
        setGeneralData(generalData.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // FILTERED PROJECTS
  useEffect(() => {
    projectsService
      .getProjectsByTag(activeFilterTags)
      .then((result) => {
        // console.log(result.data);
        setProjects(result.data);
      })
      .catch((err) => console.log(err));
  }, [activeFilterTags]);

  // FILTERING

  const filterTags = [
    "installation",
    "performance",
    "workshop",
    "seminar",
    "exhibition",
    "article",
    "event",
    "research projects",
  ];

  const handleFilter = (tagClicked) => {
    let tempTags = [];
    if (activeFilterTags.includes(tagClicked)) {
      tempTags = activeFilterTags.filter((tag) => tag !== tagClicked);
    } else {
      tempTags = [...activeFilterTags, tagClicked];
    }
    console.log(tempTags);
    setActiveFilterTags(tempTags);
  };

  // SHOW LIST / THMB
  function handleShowList() {
    setShowList(!showList);
  }

  return (
    <>
      {generalData && (
        <section className="landing-page-image-section">
          <LandingSlideshow slideshowData={generalData.slideshow_data} />
        </section>
      )}
      <div className="page-wrapper flex-column landing-page-wrapper">
        {/* ABOUT ABSTRACT */}
        {generalData && (
          <section className="landing-page-about-section flex-column-right">
            <div className="landing-page-about-info-wrapper flex-column">
              <h1 className="landing-page-about-headline">
                {generalData.about_headline_landing}
              </h1>
              <p className="landing-page-about-abstract">
                {generalData.about_short}
              </p>
            </div>
            <Link to="/about">
              <div className="button-fit-content landing-page-morenews-button">
                more info
              </div>
            </Link>
          </section>
        )}
        {/* LATEST NEWS CONTAINER */}
        {latestNews && (
          <section className="flex-column-right landing-page-news-section">
            {latestNews.map((newsDocument, index) => {
              return (
                <NewsContainer
                  index={index}
                  active={false}
                  key={newsDocument._id}
                  newsData={newsDocument}
                />
              );
            })}
            <Link to="/news">
              <div className="button-fit-content landing-page-morenews-button">
                more news
              </div>
            </Link>
          </section>
        )}
        {/* FILTER TAGS */}
        <section className="landing-page-projects-section flex-column">
          <div className="flex-row flex-wrap landing-page-tag-filter-wrapper">
            {filterTags.map((tag) => {
              return (
                <TagFilterButton
                  key={tag}
                  tag={tag}
                  handleFilter={handleFilter}
                />
              );
            })}
          </div>
          <div className="flex-row-right">
            <div
              onClick={handleShowList}
              className="image-wrapper button landing-page-list-thumb-wrapper"
            >
              <img
                src={showList ? "/thumb-icon.png" : "/list-icon.png"}
                alt=""
              />
            </div>
          </div>
          {/* PROJECTS */}
          {projects && (
            <div className="projects-list-projects-wrapper flex-column">
              {showList ? (
                <ProjectsListList projects={projects} />
              ) : (
                <ProjectsThumbList projects={projects} />
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default HomePage;
