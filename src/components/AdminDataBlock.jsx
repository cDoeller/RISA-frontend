import React from "react";
import {Link} from "react-router-dom";

function AdminDataBlock(props) {
const {data, setData, headline, createPath} = props;

  return (
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
              <div key={data._id} className="admin-card-wrapper pointer">
                <h1 className="admin-card-title">{data.label}</h1>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default AdminDataBlock;
