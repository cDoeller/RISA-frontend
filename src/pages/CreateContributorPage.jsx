import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import contributorsService from "../services/contributors.service";
import projectsService from "../services/projects.service";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";
import "../styles/styles-pages/CreateContributor.css";

function CreateContributorPage() {
  const [availableProjects, setAvailableProjects] = useState(null);
  const [name, setName] = useState("");
  const [short_bio, setShort_bio] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState([]);
  const [website_url, setWebsite_url] = useState("");
  const [insta, setInsta] = useState("");
  const [x, setX] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    projectsService
      .getAllProjects()
      .then((result) => {
        // console.log(result.data);
        const nonUmbrellaProjects = result.data.filter((p) => {
          return !p.is_umbrella_project;
        });
        setAvailableProjects(nonUmbrellaProjects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContributor = {
      label: name,
      name,
      short_bio,
      email,
      projects: projectId,
      website_url: website_url,
      social_media: { insta: insta, x: x },
    };

    contributorsService
      .createContributor(newContributor)
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
          {/* NAME */}
          <label className="form-input-label" htmlFor="">
            name
            <input
              className="form-input-input form-input-type-text"
              type="text"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          {/* SHORT BIO */}
          <label className="form-input-label" htmlFor="">
            short bio
            <textarea
              className="form-input-textarea"
              type="text"
              value={short_bio}
              required
              onChange={(e) => {
                setShort_bio(e.target.value);
              }}
            />
          </label>
          {/* EMAIL */}
          <label className="form-input-label" htmlFor="">
            email
            <input
              className="form-input-input form-input-type-text"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </label>
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

          {/* WEBSITE */}
          <label className="form-input-label" htmlFor="">
            website
            <input
              className="form-input-input form-input-type-text"
              type="text"
              value={website_url}
              onChange={(e) => {
                setWebsite_url(e.target.value);
              }}
            />
          </label>
          {/* SOME */}
          <div className="flex-row create-contrib-some-wrapper">
            {/* INSTA */}
            <label className="form-input-label" htmlFor="">
              instagram
              <input
                className="form-input-input create-contrib-some-input"
                type="text"
                value={insta}
                onChange={(e) => {
                  setInsta(e.target.value);
                }}
              />
            </label>
            {/* X */}
            <label className=" form-input-label" htmlFor="">
              x
              <input
                className="form-input-input create-contrib-some-input"
                type="text"
                value={x}
                onChange={(e) => {
                  setX(e.target.value);
                }}
              />
            </label>
          </div>
          {/* BUTTON */}
          <button className="form-button pointer" type="submit">
            submit
          </button>
        </form>
      </section>
    </>
  );
}

export default CreateContributorPage;
