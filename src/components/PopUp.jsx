import React from "react";
import "../styles/styles-components/PopUp.css";

function Popup(props) {
  const { title, content, closeSetter } = props;

  return (
    <div className="popup-wrapper flex-column">
      <section className="popup-close-button-wrapper flex-row">
        <div
          className="button popup-close-button"
          onClick={() => {
            closeSetter(false);
          }}
        >
          X
        </div>
      </section>
      {content && (
        <section className="popup-content-wrapper flex-column">
          {title && <p className="popup-title">{title}</p>}
          <p className="popup-content">{content}</p>
        </section>
      )}
    </div>
  );
}

export default Popup;
