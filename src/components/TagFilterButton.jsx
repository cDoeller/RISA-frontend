import React, { useState } from "react";
import "../styles/styles-components/TagFilterButton.css";

function TagFilterButton(props) {
  const { tag, handleFilter } = props;
  const [buttonIsActive, setButtonIsActive] = useState(false);

  const handleButtonClick = () => {
    setButtonIsActive(!buttonIsActive);
    handleFilter(tag);
  };

  return (
    <div
      onClick={handleButtonClick}
      className={buttonIsActive ? "button-small-active" : "button-small"}
    >
      {tag}
    </div>
  );
}

export default TagFilterButton;
