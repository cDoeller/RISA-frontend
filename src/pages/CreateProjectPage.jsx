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
  const [imageCloudinaryUrl, setImageCloudinaryUrl] = useState([]);
  // err
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // * SUBMIT FORM
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (imageData.length > 0) {
        let newProject = {
          label: title,
          title,
          description,
          contributors: contributors ? contributors : [],
          year,
          research_project: researchProject ? researchProject : null,
          tags,
          link,
        };

        // make body formdata for cloudinary route
        const imageUploadData = new FormData();
        imageData.forEach((imageFile) => {
          imageUploadData.append("files", imageFile);
        });

        const cloudinaryResponse = await cloudinaryService.uploadMultiple(
          imageUploadData
        );
        console.log("cloudi response", cloudinaryResponse);
        newProject.images_url = cloudinaryResponse.data.fileUrls;

        const createProjectResponse = await projectsService.createProject(
          newProject
        );
        console.log("proj response", createProjectResponse);

        navigate("/admin");
      } else {
        setErrorMessage("please upload at least one image.");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
  }

  // * REACT SELECT OPTIONS
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

  // * REACT SELECT HANDLE SELECT FUNCTIONS
  function handleTagSelectChange(selectedOption) {
    setTags(selectedOption.value);
  }
  function handleContributorsSelectChange(selectedOption) {
    setContributors(selectedOption.value);
  }
  function handleProjectsSelectChange(selectedOption) {
    setResearchProject(selectedOption.value);
  }

  // * IMAGES FILE UPLOAD
  function handleImageDelete(index) {
    const newImageData = [...imageData];
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    newImageData.splice(index, 1);
    setImageData(newImageData);
    setImagePreviews(newPreviews);
  }

  const handleImageInput = (event) => {
    // make an array of image files from input data
    event.preventDefault();
    const files = event.target.files;
    handleImageData(files);
  };

  function handleImageData(filesToUpload) {
    // 1) set the image data for uploading
    // 2) make the previews
    const filesArray = Array.from(filesToUpload);
    const newImageData = [...imageData, ...filesArray];
    setImageData(newImageData);
    const previews = newImageData.map((files) => URL.createObjectURL(files));
    setImagePreviews(previews);
  }

  // ERRORS
  const errorMessageElement = <p className="error-message">{errorMessage}</p>;

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
          <label className="form-input-label">
            images
            <input
              type="file"
              accept=".jpg, .png"
              id="create-project-file-input"
              className="form-file-input-hide"
              multiple
              onChange={(event) => {
                handleImageInput(event);
              }}
            />
            <label
              className="create-project-file-input-brwose-button pointer"
              htmlFor="create-project-file-input"
            >
              Choose Files (6 max.)
            </label>
          </label>
          {/* image previews */}
          {imagePreviews.length > 0 && (
            <div className="create-project-image-previews-wrapper flex-column">
              {imagePreviews.map((previewUrl, index) => {
                return (
                  <div
                    key={previewUrl}
                    className="create-project-image-previews-img-wrapper flex-row-center-start"
                  >
                    <img src={previewUrl} alt={`image preview ${index}`} />
                    <button
                      className="create-project-image-previews-delete-button"
                      onClick={() => {
                        handleImageDelete(index);
                      }}
                    >
                      X
                    </button>
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
          {/* ERROR MESSAGE */}
          {errorMessage && errorMessageElement}
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
