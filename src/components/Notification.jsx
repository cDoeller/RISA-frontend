import { React } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Notification(props) {
  const { title, text, route } = props;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(route);
  };

  return (
    <div className="notification-wrapper flex-column-center">
      <div className="notification flex-column-center">
        <h2 className="notification-title">{title}</h2>
        <p className="notification-text">{text}</p>
        <button
          className="notification-button button"
          onClick={handleButtonClick}
        >
          OK
        </button>
      </div>
    </div>
  );
}

Notification.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  route: PropTypes.string,
};

Notification.defaultProps = {
  title: "Please Note",
  route: "/",
};

export default Notification;
