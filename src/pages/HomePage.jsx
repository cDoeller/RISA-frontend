import { React, useState, useEffect } from "react";
import "../styles/styles-pages/HomePage.css";
import projectsService from "../services/projects.service";
import newsService from "../services/news.service";
import { Link } from "react-router-dom";
import TagFilterButton from "../components/TagFilterButton";
import NewsContainer from "../components/NewsContainer";

function HomePage() {
  const [projects, setProjects] = useState(null);
  const [activeFilterTags, setActiveFilterTags] = useState([]);
  const [latestNews, setLatestNews] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const latestNewsFetch = await newsService.getLatestNews();
        console.log(latestNewsFetch.data);
        setLatestNews(latestNewsFetch.data);
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

  return (
    <>
      <section className="landing-page-image-section">
        <div className="landing-page-image-section-wrapper flex-column">
          <div className="landing-page-image-section-image-wrapper fill-image ">
            <img src="pcp.jpg" alt="" />
          </div>
          <div className="landing-page-image-gallerytools-wrapper flex-row-center">
            <div className="image-wrapper landing-page-image-gallerytools-arrow">
              <img
                src="/delete-icon.png"
                alt=""
              />
            </div>
            <p className="landing-page-image-gallerytools-info">
              some info text about the image
            </p>
            <div className="image-wrapper landing-page-image-gallerytools-arrow">
              <img
                src="/delete-icon.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <div className="page-wrapper flex-column landing-page-wrapper">
        {/* ABOUT ABSTRACT */}
        <section className="landing-page-about-section flex-column-right">
          <div className="landing-page-about-info-wrapper flex-column">
            <h1 className="landing-page-about-headline">
              how can we connect with »natural« environments?
            </h1>
            <p className="landing-page-about-abstract">
              RISA - Research Institute for Specualtive Atmospheres is a
              platform for Artistic Research Projects on the question of how we
              can (re-)connect with our environments by using speculative
              methods of observation, analysis and transformation.
            </p>
          </div>
          <Link to="/about">
            <div className="button-fit-content landing-page-morenews-button">
              more info
            </div>
          </Link>
        </section>
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
          {/* PROJECTS */}
          {projects && (
            <div className="projects-list-projects-wrapper flex-column">
              {projects.map((project) => {
                return (
                  <Link to={`/projects/${project._id}`} key={project._id}>
                    <div className="projects-list-card-wrapper flex-column-left pointer">
                      <div className="projects-list-card-image-wrapper fill-image">
                        <img src={project.images_url[0]} alt="" />
                      </div>
                      <h1 className="projects-list-card-title">
                        {project.title}
                      </h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default HomePage;
