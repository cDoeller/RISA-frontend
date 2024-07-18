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
        console.log(latestNewsFetch.data)
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
    <div className="page-wrapper flex-column landing-page-wrapper">
      {/* LATEST NEWS CONTAINER */}
      {latestNews && (
        <section className="flex-column-right landing-page-news-section">
          {latestNews.map((newsDocument) => {
            return (
              <NewsContainer key={newsDocument._id} newsData={newsDocument} />
            );
          })}
          <div className="button-fit-content landing-page-morenews-button">
            more news
          </div>
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
  );
}

export default HomePage;
