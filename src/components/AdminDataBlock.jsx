import React, { useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
import contributorsService from "../services/contributors.service";
import projectsService from "../services/projects.service";

function AdminDataBlock(props) {
  const { data, setData, headline, createPath } = props;
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteRequest, setDeleteRequest] = useState(false);

  function handleDeleteItem() {
    if (deleteItem.type === "Projects") {
      projectsService
        .deleteProject(deleteItem.id)
        .then((result) => {
          console.log(result);
          return projectsService.getAllProjects();
        })
        .then ((result)=>{
          setData(result.data)
        })
        .catch((err) => console.log(err));
    }
    if (deleteItem.type === "Contributors") {
      contributorsService
        .deleteContributor(deleteItem.id)
        .then((result) => {
          console.log(result);
          return contributorsService.getAllContributors();
        })
        .then((result)=>{
          setData(result.data);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <section className="admin-project-section flex-column-left">
        <div className="admin-search-wrapper flex-row-left">
          <label className="admin-label flex-row">
            {headline}
            <input className="admin-input" type="text" />
          </label>
          <Link to={createPath}>
            <div className="admin-add-button image-wrapper pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/54/54570.png"
                alt=""
              />
            </div>
          </Link>
        </div>
        <div className="admin-list-container flex-column-left">
          {data &&
            data.map((data) => {
              return (
                <div
                  key={data._id}
                  className="admin-card-wrapper pointer flex-row-between-aligncenter"
                >
                  <h1 className="admin-card-title">{data.label}</h1>
                  <div className="admin-update-delete-wrapper flex-row-aligncenter">
                    <Link to="#">
                      <div className="image-wrapper admin-update-delete-icons">
                        <img src="update-icon.png" alt="" />
                      </div>
                    </Link>
                    <div
                      className="image-wrapper admin-update-delete-icons"
                      onClick={() => {
                        setDeleteItem({
                          id: data._id,
                          title: data.label,
                          type: headline,
                        });
                        setDeleteRequest(true);
                      }}
                    >
                      <img src="delete-icon.png" alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      {deleteRequest && (
        <Notification
          title="Delete Entry"
          text={`Do you really want to delete ${deleteItem.title}?`}
          route="/admin"
          multi={true}
          functionality={handleDeleteItem}
          setter={setDeleteRequest}
        />
      )}
    </>
  );
}

export default AdminDataBlock;
