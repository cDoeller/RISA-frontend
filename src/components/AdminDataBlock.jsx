import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
import contributorsService from "../services/contributors.service";
import projectsService from "../services/projects.service";

function AdminDataBlock(props) {
  const { headline, createPath } = props;
  const [data, setData] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteRequest, setDeleteRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching & Filtering
  useEffect(() => {
    switch (headline) {
      case "Projects":
        projectsService
          .searchProjects(searchQuery)
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => console.log(err));
        break;
      case "Contributors":
        contributorsService
          .searchContributor(searchQuery)
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => console.log(err));
        break;
    }
  }, [searchQuery, headline, setData]);

  // delete entries
  function handleDeleteItem() {
    if (deleteItem.type === "Projects") {
      projectsService
        .deleteProject(deleteItem.id)
        .then((result) => {
          console.log(result);
          return projectsService.getAllProjects();
        })
        .then((result) => {
          setData(result.data);
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
        .then((result) => {
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
            <input
              className="admin-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
        {/* LIST */}
        <div className="admin-list-container flex-column-left">
          {data &&
            data.map((data) => {
              return (
                <div
                  key={data._id}
                  className="admin-card-wrapper flex-row-between-aligncenter"
                >
                  <h1
                    className={
                      !data.is_umbrella_project
                        ? "admin-card-title"
                        : "admin-card-title admin-card-higlight-umbrella"
                    }
                  >
                    {data.label}
                  </h1>
                  <div className="admin-update-delete-wrapper flex-row-aligncenter">
                    <Link
                      to={
                        headline === "Contributors"
                          ? `/admin/update-contributor/${data._id}`
                          : `/admin/update-project/${data._id}`
                      }
                    >
                      <div className="image-wrapper admin-update-delete-icons pointer">
                        <img src="update-icon.png" alt="" />
                      </div>
                    </Link>
                    <div
                      className="image-wrapper admin-update-delete-icons pointer"
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
