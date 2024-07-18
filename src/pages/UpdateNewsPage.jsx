import react, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import newsService from "../services/news.service";
import projectsService from "../services/projects.service";
import cloudinaryService from "../services/cloudinary.services";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";

function UpdateNewsPage() {
  const [availableProjects, setAvailableProjects] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [defaultProjects, setDefaultProjects] = useState(null);
  const [projectId, setProjectId] = useState([]);
  const [link, setLink] = useState("");
  // image data
  const [imageData, setImageData] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  // err
  const [errorMessage, setErrorMessage] = useState("");
  // infra
  const todayDate = new Date().toJSON().slice(0, 10);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await newsService.getNews(id);
        // related projects
        if (newsData.data.related_projects) {
          setDefaultProjects(
            newsData.data.related_projects.map((proj) => {
              return { value: proj._id, label: proj.title };
            })
          );
          setProjectId(
            newsData.data.related_projects.map((proj) => {
              return proj._id;
            })
          );
        }
        // other stuff
        setTitle(newsData.data.title);
        setDescription(newsData.data.description);
        setDate(newsData.data.date);
        setLink(newsData.data.link);
        // images
        if (newsData.data.image_url) {
          setImageData(newsData.data.image_url);
          setImagePreviews([newsData.data.image_url]);
        }
        const projectsData = await projectsService.getAllProjects();
        setAvailableProjects(projectsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newNews = {
        label: title,
        title,
        description,
        date,
        related_projects: projectId,
        link,
      };

      if (imageData) {
        // if something new to upload --> make new form data
        if (typeof imageData !== "string") {
          let imageUploadData = new FormData();
          imageUploadData.append("files", imageData);
          const cloudinaryResponse = await cloudinaryService.uploadSingle(
            imageUploadData
          );
          newNews.image_url = cloudinaryResponse.data.fileUrl;
        }
      } else {
        newNews.image_url = "";
      }

      const createdNews = await newsService.updateNews(id, newNews);
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
          {/* DATE */}
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
          {console.log(defaultProjects)}
          <label className="form-input-label" htmlFor="">
            default projects
            <div>
              {defaultProjects &&
                defaultProjects.map((p) => {
                  return <p key={p.value}>{p.label}: {p.value}</p>;
                })}
            </div>
          </label>
          {/* REACT SELECT */}
          <label className="form-input-label" htmlFor="">
            projects
            <Select
              defaultValue={defaultProjects && defaultProjects}
              options={projectsOptions.length > 0 && projectsOptions}
              onChange={handleProjectsSelectChange}
              styles={selectStles}
              isMulti
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

export default UpdateNewsPage;
