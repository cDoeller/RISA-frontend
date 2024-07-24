import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generalService from "../services/general.service";
import cloudinaryService from "../services/cloudinary.services";
import "../styles/styles-pages/GeneralDataPage.css";

// PROBLEME
// state change error captions

function GeneralDataPage() {
  const [about_short, setAbout_short] = useState("");
  const [about_long_general, setAbout_long_general] = useState("");
  const [about_long_top, setAbout_long_top] = useState("");
  const [about_headline_top, setAbout_headline_top] = useState("");
  const [about_long_bottom, setAbout_long_bottom] = useState("");
  const [about_headline_bottom, setAbout_headline_bottom] = useState("");
  const [id, setId] = useState("");
  // image data
  const [imageData, setImageData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [captions, setCaptions] = useState([]);
  // err
  const [errorMessage, setErrorMessage] = useState("");
  // infra
  const navigate = useNavigate();
  const maxImages = 10;

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const generalData = await generalService.getGeneralData();
        setAbout_short(generalData.data[0].about_short);
        setAbout_long_general(generalData.data[0].about_long_general);
        setAbout_long_top(generalData.data[0].about_long_top);
        setAbout_headline_top(generalData.data[0].about_headline_top);
        setAbout_long_bottom(generalData.data[0].about_long_bottom);
        setAbout_headline_bottom(generalData.data[0].about_headline_bottom);
        setId(generalData.data[0]._id);
        // fill image data
        let tempImageUrlArray = [];
        let tempImageCaptionsArray = [];
        generalData.data[0].slideshow_data.forEach((e) => {
          tempImageUrlArray.push(e.image_url);
          tempImageCaptionsArray.push(e.caption);
        });
        setImageData(tempImageUrlArray);
        setImagePreviews(tempImageUrlArray);
        const freeSlots = maxImages - tempImageCaptionsArray.length;
        if (freeSlots) {
          for (let i = 0; i < freeSlots; i++) {
            tempImageCaptionsArray.push(
              `new image caption`
            );
          }
        }
        setCaptions(tempImageCaptionsArray);
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
        slideshow_data: [],
      };

      // IMAGES UPLOAD
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
        // New Images
        // upload only new image data to cloudinary
        const cloudinaryResponse = await cloudinaryService.uploadMultiple(
          imageUploadData
        );
        // combine old and new cloudinary ulrs
        let newImageUrls = imageData.filter((element) => {
          return typeof element === "string";
        });
        newImageUrls = [...newImageUrls, ...cloudinaryResponse.data.fileUrls];
        for (let i = 0; i < newImageUrls.length; i++) {
          const tempObj = { image_url: newImageUrls[i], caption: captions[i] };
          newGeneralData.slideshow_data.push(tempObj);
        }
      } else {
        // ! New Images
        // collect the current images (old, less if deleted)
        for (let i = 0; i < imageData.length; i++) {
          const tempObj = { image_url: imageData[i], caption: captions[i] };
          newGeneralData.slideshow_data.push(tempObj);
        }
      }

      const updatedGeneral = await generalService.updateGeneralData(
        id,
        newGeneralData
      );
      navigate("/admin");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      console.log(err);
    }
  };

  // * IMAGES FILE UPLOAD
  function handleImageDelete(index) {
    const newImageData = [...imageData];
    const newPreviews = [...imagePreviews];
    const newCaptions = [...captions];
    newPreviews.splice(index, 1);
    newImageData.splice(index, 1);
    newCaptions[index] = `new image caption`;
    setImageData(newImageData);
    setImagePreviews(newPreviews);
    setCaptions(newCaptions);
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

  function handleCaptions(index, value) {
    let tempCaptions = [...captions];
    tempCaptions[index] = value;
    setCaptions(tempCaptions);
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
          <label className="form-input-label">
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
          <label className="form-input-label" htmlFor="aboutHeadlineBottom">
            about headline bottom
            <input
              className="form-input-input"
              id="aboutHeadlineBottom"
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
              Choose Files ({`${maxImages}`} max.)
            </label>
          </label>
          {/* image previews */}
          {imagePreviews.length > 0 && (
            <div className="create-project-image-previews-wrapper general-data-images-wrapper flex-column">
              {imagePreviews.map((previewUrl, index) => {
                return (
                  <div
                    key={previewUrl}
                    className="general-data-img-caption-wrapper flex-column"
                  >
                    <div className="create-project-image-previews-img-wrapper flex-row-center-start">
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
                    <label htmlFor="" className="form-input-label">
                      Caption
                      <input
                        className="form-input-input"
                        type="text"
                        value={captions[index]}
                        onChange={(e) => {
                          handleCaptions(index, e.target.value);
                        }}
                      />
                    </label>
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
