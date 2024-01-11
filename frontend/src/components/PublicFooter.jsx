import { Link, useLocation } from "react-router-dom";

const DashFooter = () => {
  const { pathname } = useLocation();

  let goHomeButton = null;
  if (pathname !== "/") {
    goHomeButton = <Link to="/">Go back to Home</Link>;
  }

  if (pathname !== "/login") {
    goHomeButton = <Link to="/login">Employee Login</Link>;
  }

  const content = (
    <footer className="public-footer">
      <div className="public-footer__left">{goHomeButton}</div>
      <div className="public-footer__right">
        <p>&copy; 2024 QNotes. All rights reserved.</p>
      </div>
    </footer>
  );
  return content;
};
export default DashFooter;
