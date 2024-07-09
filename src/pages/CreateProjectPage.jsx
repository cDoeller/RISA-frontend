import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/styles-pages/CreateProjectPage.css";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";
import cloudinaryService from "../services/cloudinary.services";
import projectsService from "../services/projects.service";
import contributorsService from "../services/contributors.service";

function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributorsId, setContributorsId] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [umbrellaProjectId, setUmbrellaProjectId] = useState("");
  const [umbrellaProjectTitle, setUmbrellaProjectTitle] = useState("");
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [isUmbrellaProject, setIsUmbrellaProject] = useState(false);
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState("");
  // selectData
  const [allProjects, setAllProjects] = useState(null);
  const [allContributors, setAllContributors] = useState(null);
  // image data
  const [imageData, setImageData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  // err
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResult = await projectsService.getAllProjects();
        setAllProjects(projectsResult.data);
        const contributorsResult =
          await contributorsService.getAllContributors();
        setAllContributors(contributorsResult.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // * SUBMIT FORM
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      // if (imageData.length > 0) {
      let newProject = {
        label: title,
        title,
        description,
        contributors: contributorsId,
        year,
        umbrella_project: umbrellaProjectId ? umbrellaProjectId : null,
        related_projects: relatedProjects,
        is_umbrella_project: isUmbrellaProject,
        tags,
        link: link,
      };

      //  ************************************ this if is only temporary
      if (imageData.length > 0) {
        // make body formdata for cloudinary route
        const imageUploadData = new FormData();
        imageData.forEach((imageFile) => {
          imageUploadData.append("files", imageFile);
        });

        const cloudinaryResponse = await cloudinaryService.uploadMultiple(
          imageUploadData
        );
        newProject.images_url = cloudinaryResponse.data.fileUrls;
      } else {
        newProject.images_url = [];
      }

      const createProjectResponse = await projectsService.createProject(
        newProject
      );

      navigate("/admin");
      // } else {
      // setErrorMessage("please upload at least one image.");
      // }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
  }

  // * REACT SELECT OPTIONS
  let tagOptions = [
    { value: "installation", label: "installation" },
    { value: "performance", label: "performance" },
    { value: "workshop", label: "workshop" },
    { value: "seminar", label: "seminar" },
    { value: "exhibition", label: "exhibition" },
    { value: "article", label: "article" },
    { value: "event", label: "event" },
  ];

  let contributorOptions = [];
  if (allContributors) {
    allContributors.forEach((contributor) => {
      contributorOptions.push({
        value: contributor._id,
        label: contributor.name,
      });
    });
  }

  let umbrellaProjectOptions = [{ value: "", label: "-" }];
  if (allProjects) {
    allProjects.forEach((project) => {
      if (project.is_umbrella_project) {
        umbrellaProjectOptions.push({
          value: project._id,
          label: project.title,
        });
      }
    });
  }

  let relatedProjectsOptions = [];
  if (allProjects) {
    allProjects.forEach((project) => {
      if (!project.is_umbrella_project) {
        relatedProjectsOptions.push({
          value: project._id,
          label: project.title,
        });
      }
    });
  }

  // * REACT SELECT HANDLE SELECT FUNCTIONS
  function handleTagSelectChange(selectedOption) {
    const tagsArray = selectedOption.map((option) => {
      return option.value;
    });
    setTags(tagsArray);
  }

  function handleContributorsSelectChange(selectedOption) {
    const contributorIdArray = selectedOption.map((option) => {
      return option.value;
    });
    setContributorsId(contributorIdArray);
  }

  function handleProjectsSelectChange(selectedOption) {
    setUmbrellaProjectId(selectedOption.value);
    setUmbrellaProjectTitle(selectedOption.label);
  }

  function handleRelatedProjectsSelectChange(selectedOption) {
    const relatedProjectsIdArray = selectedOption.map((option) => {
      return option.value;
    });
    setRelatedProjects(relatedProjectsIdArray);
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

  // CHECKBOX
  function handleCheckbox(isChecked) {
    if (isChecked) {
      setIsUmbrellaProject(true);
    } else {
      setIsUmbrellaProject(false);
    }
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
              min="1950"
              max={new Date().getFullYear()}
              step="1"
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
              Choose Files (10 max.)
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

          <div className="no-change-div flex-column">
            {/* UMBRELLA CHECKBOX */}
            <label className="form-input-label-checkbox" htmlFor="">
              <input
                type="checkbox"
                checked={isUmbrellaProject}
                onChange={(e) => {
                  handleCheckbox(e.target.checked);
                }}
              />
              This is an umbrella for other projects
            </label>

            {/* UMBRELLA PROJECT */}
            {!isUmbrellaProject && (
              <label className="form-input-label" htmlFor="">
                umbrella project
                <Select
                  options={umbrellaProjectOptions}
                  onChange={handleProjectsSelectChange}
                  value={{ label: umbrellaProjectTitle }}
                  styles={selectStles}
                />
              </label>
            )}

            <label className="form-input-label" htmlFor="">
              Please Note: <br /> This can not be changed at a later time.
            </label>
          </div>

          {/* RELATED PROJECTS */}
          {isUmbrellaProject && (
            <label className="form-input-label" htmlFor="">
              related projects
              <Select
                options={relatedProjectsOptions}
                onChange={handleRelatedProjectsSelectChange}
                styles={selectStles}
                isMulti
              />
            </label>
          )}

          {/* CONTRIBUTIORS */}
          {/* REACT SELECT */}
          {!isUmbrellaProject && (
            <label className="form-input-label" htmlFor="">
              contributors
              <Select
                options={contributorOptions}
                onChange={handleContributorsSelectChange}
                styles={selectStles}
                isMulti
              />
            </label>
          )}

          {/* TAGS */}
          {/* REACT SELECT */}
          <label className="form-input-label" htmlFor="">
            tags
            <Select
              options={tagOptions}
              onChange={handleTagSelectChange}
              styles={selectStles}
              isMulti
            />
          </label>
          {/* LINK */}
          <label className="form-input-label" htmlFor="">
            website
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
