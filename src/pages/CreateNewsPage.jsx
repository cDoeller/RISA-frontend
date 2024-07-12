import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import newsService from "../services/news.service";
import projectsService from "../services/projects.service";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";

function CreateNewsPage() {
  const [availableProjects, setAvailableProjects] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [projectId, setProjectId] = useState([]);
  const [link, setLink] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNews = {
      title,
      description,
      date,
      //   image_url,
      related_projects: projectId,
      link,
    };

    newsService
      .createNews(newNews)
      .then((response) => {
        console.log(response);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
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
          {/* IMAGE */}

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
