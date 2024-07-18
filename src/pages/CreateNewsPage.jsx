import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import newsService from "../services/news.service";
import projectsService from "../services/projects.service";
import cloudinaryService from "../services/cloudinary.services";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";

function CreateNewsPage() {
  const [availableProjects, setAvailableProjects] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));
  const [projectId, setProjectId] = useState([]);
  const [link, setLink] = useState("");
  const [isEvent, setIsEvent] = useState(false);
  const [hasEndDate, setHasEndDate] = useState(false);
  // image data
  const [imageData, setImageData] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  // err
  const [errorMessage, setErrorMessage] = useState("");

  const todayDate = new Date().toJSON().slice(0, 10);

  const navigate = useNavigate();

  useEffect(() => {
    projectsService
      .getAllProjects()
      .then((result) => {
        console.log("all projects", result.data);
        setAvailableProjects(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newNews = {
        label: title,
        title,
        description,
        is_event: isEvent,
        has_end_date: hasEndDate,
        end_date: hasEndDate ? endDate : "",
        date: isEvent ? date : "",
        related_projects: projectId,
        link,
      };

      if (imageData) {
        // make body formdata for cloudinary route
        const imageUploadData = new FormData();
        imageUploadData.append("files", imageData);
        const cloudinaryResponse = await cloudinaryService.uploadSingle(
          imageUploadData
        );
        newNews.image_url = cloudinaryResponse.data.fileUrl;
      } else {
        newNews.image_url = "";
      }

      const createdNews = await newsService.createNews(newNews);
      navigate("/admin");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      console.log(err);
    }
  };

  // REACT SELECT OPTIONS
  let projectsOptions = [];
  if (availableProjects) {
    availableProjects.forEach((element) => {
      projectsOptions.push({ value: element._id, label: element.title });
    });
  }

  // REACT SELECT HANDLE SELECT FUNCTIONS
  function handleProjectsSelectChange(selectedOption) {
    const projectIdArray = selectedOption.map((option) => {
      return option.value;
    });
    setProjectId(projectIdArray);
  }

  // * IMAGES FILE UPLOAD
  function handleImageDelete() {
    setImageData(null);
    setImagePreviews([]);
  }

  const handleImageInput = (event) => {
    // >> coming from form input
    // make an array of image files from input data
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      handleImageData(file);
    }
  };

  function handleImageData(fileToUpload) {
    // 1) set the image data for uploading
    // 2) make the previews
    setImageData(fileToUpload);
    const preview = [URL.createObjectURL(fileToUpload)];
    console.log("preview", preview);
    setImagePreviews(preview);
  }

  // CHECKBOX
  function handleCheckbox(isChecked, checkbox) {
    if (isChecked) {
      if (checkbox === "event") {
        setIsEvent(true);
      }
      if (checkbox === "enddate") {
        setHasEndDate(true);
      }
    } else {
      if (checkbox === "event") {
        setIsEvent(false);
      }
      if (checkbox === "enddate") {
        setHasEndDate(false);
      }
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
            description (max. 500 characters)
            <textarea
              className="form-input-textarea"
              type="text"
              value={description}
              required
              maxLength="500"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <p>{description.length}</p>
          </label>
          {/* CHECKBOX DATE */}
          <label className="form-input-label-checkbox" htmlFor="">
            <input
              type="checkbox"
              checked={isEvent}
              onChange={(e) => {
                handleCheckbox(e.target.checked, "event");
              }}
            />
            Assign a date
          </label>
          {/* DATE */}
          {isEvent && (
            <>
              <label className="form-input-label" htmlFor="">
                date
                <input
                  className="form-input-input form-input-type-text"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  min={todayDate}
                />
              </label>

              <label className="form-input-label-checkbox" htmlFor="">
                <input
                  type="checkbox"
                  checked={hasEndDate}
                  onChange={(e) => {
                    handleCheckbox(e.target.checked, "enddate");
                  }}
                />
                assign end date
              </label>
              {hasEndDate && (
                <label className="form-input-label" htmlFor="">
                  end date
                  <input
                    className="form-input-input form-input-type-text"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                    min={date}
                  />
                </label>
              )}
            </>
          )}
          {/* IMAGES */}
          <label className="form-input-label">
            images
            <input
              type="file"
              accept=".jpg, .png"
              id="create-project-file-input"
              className="form-file-input-hide"
              onChange={(event) => {
                handleImageInput(event);
              }}
            />
            <label
              className="create-project-file-input-brwose-button pointer"
              htmlFor="create-project-file-input"
            >
              Choose File
            </label>
          </label>
          {/* image previews */}
          {imagePreviews.length > 0 && (
            <div className="create-project-image-previews-wrapper flex-column">
              {imagePreviews.map((previewUrl) => {
                return (
                  <div
                    key={previewUrl}
                    className="create-project-image-previews-img-wrapper flex-row-center-start"
                  >
                    <img src={previewUrl} alt={`image preview`} />
                    <button
                      className="create-project-image-previews-delete-button"
                      onClick={() => {
                        handleImageDelete();
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {/* PROJECTS */}
          {/* REACT SELECT */}
          {projectsOptions.length > 0 && (
            <label className="form-input-label" htmlFor="">
              projects
              <Select
                options={projectsOptions}
                onChange={handleProjectsSelectChange}
                styles={selectStles}
                isMulti
              />
            </label>
          )}
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

export default CreateNewsPage;
