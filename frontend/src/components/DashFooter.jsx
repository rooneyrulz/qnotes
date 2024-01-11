import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon size="lg" icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      <div className="dash-footer__left">
        {goHomeButton}
        <p>Current User: {username}</p>
        <p>Status: {status}</p>
      </div>
      <div className="dash-footer__right">
        <p>&copy; 2024 QNotes. All rights reserved.</p>
      </div>
    </footer>
  );
  return content;
};
export default DashFooter;
