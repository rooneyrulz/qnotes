// NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import useTitle from "../hooks/useTitle"

const NotFound = () => {
  useTitle("NotFound");

  return (
    <div className="not-found-body">
      <div className="not-found-container">
        <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
        <h1 className="title">Oops, Page Not Found!</h1>
        <p className="description">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="home-link">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
