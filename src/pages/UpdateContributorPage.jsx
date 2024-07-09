import react, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import contributorsService from "../services/contributors.service";
import projectsService from "../services/projects.service";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";
import "../styles/styles-pages/CreateContributor.css";

function UpdateContributorPage() {
  const [availableProjects, setAvailableProjects] = useState(null);
  const [name, setName] = useState("");
  const [short_bio, setShort_bio] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState([]);
  const [defaultProjects, setDefaultProjects] = useState([]);
  const [website_url, setWebsite_url] = useState("");
  const [insta, setInsta] = useState("");
  const [x, setX] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  //  Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contributorData = await contributorsService.getContributor(id);

        console.log(contributorData.data);

        setName(contributorData.data.name);
        setShort_bio(contributorData.data.short_bio);
        setEmail(contributorData.data.email);
        setInsta(contributorData.data.social_media.insta);
        setX(contributorData.data.social_media.x);
        setWebsite_url(contributorData.data.website_url);

        // console.log(contributorData.data.projects);
        // contributorData.data.projects.forEach((e) => {
        //   console.log(typeof e);
        // });

        if (contributorData.data.projects.length > 0) {
          const projIdArray = contributorData.data.projects.map((proj) => {
            return proj._id;
          });
          setProjectId(projIdArray);
          setDefaultProjects(
            contributorData.data.projects.map((proj) => {
              return { value: proj._id, label: proj.title };
            })
          );
        }

        const allProjectsData = await projectsService.getAllProjects();
        setAvailableProjects(allProjectsData.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContributor = {
      label: name,
      name,
      short_bio,
      email,
      projects: projectId,
      website_url: website_url,
      social_media: { insta: insta, x: x },
    };

    contributorsService
      .updateContributor(id, updatedContributor)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));

    navigate("/admin");
  };

  // REACT SELECT OPTIONS
  let projectsOptions = [];
  if (availableProjects) {
    availableProjects.forEach((element) => {
      if (!element.is_umbrella_project) {
        projectsOptions.push({ value: element._id, label: element.title });
      }
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
                defaultValue={defaultProjects && defaultProjects}
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

export default UpdateContributorPage;
