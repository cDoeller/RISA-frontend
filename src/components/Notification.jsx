import { React } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Notification(props) {
  const { title, text, route, functionality, multi, setter } = props;
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate(route);
  };
  const handleYesClick = () => {
    functionality();
    setter(false);
    navigate(route);
  };
  const handleNoClick = () => {
    setter(false);
  };

  return (
    <div className="notification-wrapper flex-column-center">
      <div className="notification flex-column-center">
        <h2 className="notification-title">{title}</h2>
        <p className="notification-text">{text}</p>
        {multi ? (
          <div className="notification-multi-wrapper flex-row">
            <button
              className="notification-button button"
              onClick={handleYesClick}
            >
              YES
            </button>
            <button
              className="notification-button button"
              onClick={handleNoClick}
            >
              NO
            </button>
          </div>
        ) : (
          <button
            className="notification-button button"
            onClick={handleOkClick}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}

Notification.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  route: PropTypes.string,
  functionality: PropTypes.func,
  setter: PropTypes.func,
  multi: PropTypes.bool,
};

Notification.defaultProps = {
  title: "Please Note",
  route: "/",
  escape: false,
  multi: false,
};

export default Notification;
