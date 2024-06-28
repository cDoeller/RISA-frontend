import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import projectsService from "../services/projects.service";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";

function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState(null);
  const [year, setYear] = useState(0);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [researchProject, setResearchProject] = useState(null);
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      label: title,
      title,
      description,
      contributors: contributors ? contributors : [],
      year,
      images_url: imagesUrl,
      research_project: researchProject ? researchProject : null,
      tags,
      link,
    };

    projectsService
      .createProject(newProject)
      .then((response) => {
        console.log(response);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };

  // REACT SELECT OPTIONS
  let tagOptions = [
    // { value: "", label: "- type / select -" },
    { value: "installation", label: "installation" },
    { value: "performance", label: "performance" },
    { value: "workshop", label: "workshop" },
    { value: "seminar", label: "seminar" },
    { value: "exhibition", label: "exhibition" },
    { value: "article", label: "article" },
    { value: "event", label: "event" },
  ];
  let contributorOptions = [
    // { value: "", label: "- type / select -" },
    { value: "", label: "-" },
    { value: "installation", label: "installation" },
    { value: "performance", label: "performance" },
    { value: "workshop", label: "workshop" },
    { value: "seminar", label: "seminar" },
    { value: "exhibition", label: "exhibition" },
    { value: "article", label: "article" },
    { value: "event", label: "event" },
  ];
  let projectOptions = [
    // { value: "", label: "- type / select -" },
    { value: "", label: "-" },
    { value: "installation", label: "installation" },
    { value: "performance", label: "performance" },
    { value: "workshop", label: "workshop" },
    { value: "seminar", label: "seminar" },
    { value: "exhibition", label: "exhibition" },
    { value: "article", label: "article" },
    { value: "event", label: "event" },
  ];

  // REACT SELECT HANDLE SELECT FUNCTIONS
  function handleTagSelectChange(selectedOption) {
    setTags(selectedOption.value);
  }
  function handleContributorsSelectChange(selectedOption) {
    setContributors(selectedOption.value);
  }
  function handleProjectsSelectChange(selectedOption) {
    setResearchProject(selectedOption.value);
  }

  return (
    <>
      <section className="contact-form-section page-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          {/* TITLE */}
          <label className="form-input-label" htmlFor="">
            title
            <input
              className="form-input-input form-input-type-text"
              type="text"
              value={title}
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          {/* DESCRIPTION */}
          <label className="form-input-label" htmlFor="">
            description
            <textarea
              className="form-input-textarea"
              type="text"
              value={description}
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
          {/* YEAR */}
          <label className="form-input-label" htmlFor="">
            year
            <input
              className="form-input-input form-input-type-text"
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </label>
          {/* IMAGES */}
          <label className="form-input-label" htmlFor="">
            images
            <input
              className="form-input-input form-input-type-text"
              type="text"
              value={imagesUrl}
              required
              onChange={(e) => {
                setImagesUrl(e.target.value);
              }}
            />
          </label>
          {/* CONTRIBUTIORS */}
          {/* REACT SELECT */}
          <label className="form-input-label" htmlFor="">
            contributors
            <Select
              options={contributorOptions}
              onChange={handleContributorsSelectChange}
              value={{ label: contributors }}
              styles={selectStles}
            />
          </label>
          {/* RESEARCH PROJECT */}
          <label className="form-input-label" htmlFor="">
            associated project
            <Select
              options={projectOptions}
              onChange={handleProjectsSelectChange}
              value={{ label: researchProject }}
              styles={selectStles}
            />
          </label>
          {/* TAGS */}
          {/* REACT SELECT */}
          <label className="form-input-label" htmlFor="">
            tags
            <Select
              options={tagOptions}
              onChange={handleTagSelectChange}
              value={{ label: tags }}
              styles={selectStles}
            />
          </label>
          {/* LINK */}
          <label className="form-input-label" htmlFor="">
            link
            <input
              className="form-input-input form-input-type-text"
              type="text"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </label>
          {/* BUTTON */}
          <button className="form-button pointer" type="submit">
            submit
          </button>
        </form>
      </section>
    </>
  );
}

export default CreateProjectPage;
