import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generalService from "../services/general.service";
import cloudinaryService from "../services/cloudinary.services";
import Select from "react-select";
import selectStles from "../styles/react-select-styling";

function GeneralDataPage() {
  const [about_short, setAbout_short] = useState("");
  const [about_long_general, setAbout_long_general] = useState("");
  const [about_long_top, setAbout_long_top] = useState("");
  const [about_headline_top, setAbout_headline_top] = useState("");
  const [about_long_bottom, setAbout_long_bottom] = useState("");
  const [about_headline_bottom, setAbout_headline_bottom] = useState("");
  const [slideshow_data, setSlideshow_data] = useState(null);
  const [id, setId] = useState("");
  // image data
  const [imageData, setImageData] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  // err
  const [errorMessage, setErrorMessage] = useState("");
  // infra
  const navigate = useNavigate();

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const generalData = await generalService.getGeneralData();
        setAbout_short(generalData.data.about_short);
        setAbout_long_general(generalData.data.about_long_general);
        setAbout_long_top(generalData.data.about_long_top);
        setAbout_headline_top(generalData.data.about_headline_top);
        setAbout_long_bottom(generalData.data.about_long_bottom);
        setAbout_headline_bottom(generalData.data.about_headline_bottom);
        setSlideshow_data(generalData.data.slideshow_data);
        setId(generalData.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // SUBMIT DATA
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newGeneralData = {
        about_short,
        about_long_general,
        about_long_top,
        about_headline_top,
        about_long_bottom,
        about_headline_bottom,
        slideshow_data,
      };

      //   if (imageData) {
      //     // if something new to upload --> make new form data
      //     if (typeof imageData !== "string") {
      //       let imageUploadData = new FormData();
      //       imageUploadData.append("files", imageData);
      //       const cloudinaryResponse = await cloudinaryService.uploadSingle(
      //         imageUploadData
      //       );
      //       newNews.image_url = cloudinaryResponse.data.fileUrl;
      //     }
      //   } else {
      //     newNews.image_url = "";
      //   }

      const updatedGeneral = await generalService.updateGeneralData(
        id,
        newGeneralData
      );
      //   navigate("/admin");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      console.log(err);
    }
  };

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
          {/* ABOUT SHORT */}
          <label className="form-input-label" htmlFor="">
            about short (max. 250 characters)
            <textarea
              className="form-input-textarea"
              type="text"
              value={about_short}
              required
              maxLength="250"
              onChange={(e) => {
                setAbout_short(e.target.value);
              }}
            />
            {/* <p>{about_short.length}</p> */}
          </label>
          {/* ABOUT LONG GENERAL */}
          <label className="form-input-label" htmlFor="">
            about long general
            <textarea
              className="form-input-textarea"
              type="text"
              value={about_long_general}
              required
              onChange={(e) => {
                setAbout_long_general(e.target.value);
              }}
            />
          </label>
          {/* ABOUT HEADLINE TOP */}
          <label className="form-input-label" htmlFor="">
            about headline top
            <input
              className="form-input-input"
              type="text"
              value={about_headline_top}
              required
              onChange={(e) => {
                setAbout_headline_top(e.target.value);
              }}
            />
          </label>
          {/* ABOUT LONG TOP */}
          <label className="form-input-label" htmlFor="">
            about long top
            <textarea
              className="form-input-textarea"
              type="text"
              value={about_long_top}
              required
              onChange={(e) => {
                setAbout_long_top(e.target.value);
              }}
            />
          </label>
          {/* ABOUT HEADLINE BOTTOM */}
          <label className="form-input-label" htmlFor="">
            about headline bottom
            <input
              className="form-input-input"
              type="text"
              value={about_headline_bottom}
              required
              onChange={(e) => {
                setAbout_headline_bottom(e.target.value);
              }}
            />
          </label>
          {/* ABOUT LONG BOTTOM */}
          <label className="form-input-label" htmlFor="">
            about long bottom
            <textarea
              className="form-input-textarea"
              type="text"
              value={about_long_bottom}
              required
              onChange={(e) => {
                setAbout_long_bottom(e.target.value);
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

export default GeneralDataPage;
