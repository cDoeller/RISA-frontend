import { React, useState, useEffect } from "react";
import "../styles/styles-pages/HomePage.css";
import projectsService from "../services/projects.service";
import { Link } from "react-router-dom";
import TagFilterButton from "../components/TagFilterButton";

function HomePage() {
  const [projects, setProjects] = useState(null);
  const [activeFilterTags, setActiveFilterTags] = useState([]);

  // FILTERED PROJECTS
  useEffect(() => {
    projectsService
      .getProjectsByTag(activeFilterTags)
      .then((result) => {
        console.log(result.data);
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
      {/* FILTER TAGS */}
      <div className="flex-row flex-wrap landing-page-tag-filter-wrapper">
        {filterTags.map((tag) => {
          return (
            <TagFilterButton key={tag} tag={tag} handleFilter={handleFilter} />
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
                  <h1 className="projects-list-card-title">{project.title}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
