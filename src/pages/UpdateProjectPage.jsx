import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/styles-pages/CreateProjectPage.css";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";
import cloudinaryService from "../services/cloudinary.services";
import projectsService from "../services/projects.service";
import contributorsService from "../services/contributors.service";

function UpdateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributorsId, setContributorsId] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [researchProjectId, setResearchProjectId] = useState(null);
  const [researchProjectTitle, setResearchProjectTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [link, setLink] = useState("");
  // selectData
  const [allProjects, setAllProjects] = useState(null);
  const [allContributors, setAllContributors] = useState(null);
  const [defaultContributors, setDefaultContributors] = useState(null);
  const [defaultProject, setDefaultProject] = useState(null);
  // image data
  const [imageData, setImageData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  // err
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // set initial project data
        const projectData = await projectsService.getProject(id);
        setTitle(projectData.data.title);
        setDescription(projectData.data.description);
        setYear(projectData.data.year);
        setTags(projectData.data.tags);
        setImageData(projectData.data.images_url);
        setImagePreviews(projectData.data.images_url);
        setLink(projectData.data.link);
        if (projectData.data.contributors) {
          setContributorsId(
            projectData.data.contributors.map((c) => {
              return c._id;
            })
          );
          setDefaultContributors(
            projectData.data.contributors.map((c) => {
              return { value: c._id, label: c.name };
            })
          );
        }
        if (projectData.data.research_project) {
          setResearchProjectId(
            projectData.data.research_project.map((p) => {
              return p._id;
            })
          );
          setDefaultProject(
            projectData.data.research_project.map((p) => {
              return { value: p._id, label: p.title };
            })
          );
        }
        // set - all - contributors and projects data for dropdown
        const projectsResult = await projectsService.getAllProjects();
        setAllProjects(projectsResult.data);
        const contributorsResult =
          await contributorsService.getAllContributors();
        setAllContributors(contributorsResult.data);

        console.log(projectData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  // *** SUBMIT FORM ***
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (imageData.length > 0) {
        let newProject = {
          label: title,
          title,
          description,
          contributors: contributorsId ? contributorsId : [],
          year,
          research_project: researchProjectId ? researchProjectId : null,
          tags,
          link: link,
        };

        // if something new to upload --> make new form data
        let hasNewImages = false;
        let imageUploadData = new FormData();
        imageData.forEach((imageFile) => {
          if (typeof imageFile !== "string") {
            hasNewImages = true;
            imageUploadData.append("files", imageFile);
          }
        });

        if (hasNewImages) {
          // upload only new image data to cloudinary
          const cloudinaryResponse = await cloudinaryService.uploadMultiple(
            imageUploadData
          );
          console.log("cloudinaryResponse", cloudinaryResponse);
          // combine old and new cloudinary ulrs
          let newImageUrls = imageData.filter((element) => {
            return typeof element === "string";
          });
          newImageUrls = [...newImageUrls, ...cloudinaryResponse.data.fileUrls];
          newProject.images_url = newImageUrls;
          console.log("newImageUrls", newImageUrls);
        } else {
          newProject.images_url = imageData;
        }

        const updateProjectResponse = await projectsService.updateProject(
          id,
          newProject
        );
        console.log(updateProjectResponse);

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
    { value: "installation", label: "installation" },
    { value: "performance", label: "performance" },
    { value: "workshop", label: "workshop" },
    { value: "seminar", label: "seminar" },
    { value: "exhibition", label: "exhibition" },
    { value: "article", label: "article" },
    { value: "event", label: "event" },
  ];
  let defaultTagOptions = [];
  if (tags) {
    defaultTagOptions = tags.map((tag) => {
      return { value: tag, label: tag };
    });
  }

  let contributorOptions = [];
  if (allContributors) {
    allContributors.forEach((contributor) => {
      contributorOptions.push({
        value: contributor._id,
        label: contributor.name,
      });
    });
  }

  let projectOptions = [{ value: "", label: "-" }];
  if (allProjects) {
    allProjects.forEach((project) => {
      projectOptions.push({
        value: project._id,
        label: project.title,
      });
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
    setResearchProjectId(selectedOption.value);
    setResearchProjectTitle(selectedOption.label);
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
    const addedPreviews = filesArray.map((files) => URL.createObjectURL(files));
    setImagePreviews([...imagePreviews, ...addedPreviews]);
  }

  // ERRORS
  const errorMessageElement = <p className="error-message">{errorMessage}</p>;

  return (
    <>
      {allContributors && (
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
                defaultValue={defaultContributors && defaultContributors}
                options={contributorOptions}
                onChange={handleContributorsSelectChange}
                styles={selectStles}
                isMulti
              />
            </label>
            {/* RESEARCH PROJECT */}
            <label className="form-input-label" htmlFor="">
              umbrella project
              <Select
                defaultValue={defaultProject && defaultProject}
                options={projectOptions}
                onChange={handleProjectsSelectChange}
                value={{ label: researchProjectTitle }}
                styles={selectStles}
              />
            </label>
            {/* TAGS */}
            {/* REACT SELECT */}
            <label className="form-input-label" htmlFor="">
              tags
              <Select
                defaultValue={defaultTagOptions}
                options={tagOptions}
                onChange={handleTagSelectChange}
                // value={{ label: tags }}
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
      )}
    </>
  );
}

export default UpdateProjectPage;
