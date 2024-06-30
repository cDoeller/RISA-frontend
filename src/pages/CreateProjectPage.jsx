import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/styles-pages/CreateProjectPage.css";
import projectsService from "../services/projects.service";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";
import cloudinaryService from "../services/cloudinary.services";

function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState(null);
  const [year, setYear] = useState(0);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [researchProject, setResearchProject] = useState(null);
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  // image data
  const [imageData, setImageData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const { user } = useContext(AuthContext);
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

  // File Upload
  //  *************************************************************
  const handleUploadInput = (event) => {
    event.preventDefault();
    const files = event.target.files;
    console.log(files);
    handleImageData(files);
  };

  function handleImageData(filesToUpload) {
    // set the image data
    const filesArray = Array.from(filesToUpload);
    const newImageData = [...imageData, ...filesArray];
    console.log("files array: ", newImageData);
    setImageData(newImageData);
    // make the previews
    const previews = newImageData.map((files) => URL.createObjectURL(files));
    console.log("previews: ", previews);
    setImagePreviews(previews);
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
              // className="form-input-input form-input-type-text"
              type="file"
              accept=".jpg, .png"
              multiple
              onChange={(event) => {
                handleUploadInput(event);
              }}
            />
          </label>
          {/* image previews */}
          {imagePreviews.length > 0 && (
            <div className="create-project-image-previews-wrapper flex-row-wrap">
              {imagePreviews.map((url) => {
                return (
                  <div
                    key={url}
                    className="create-project-image-previews-img-wrapper"
                  >
                    <img src={url} alt="" />
                  </div>
                );
              })}
            </div>
          )}

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
