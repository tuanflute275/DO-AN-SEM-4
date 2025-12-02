import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <FaExclamationTriangle className="text-warning display-1 mb-4" />
        <h1 className="display-4 font-weight-bold mb-2">404</h1>
        <h2 className="h4 font-weight-semibold mb-4">Page Not Found</h2>
        <p className="text-muted mb-4">Oops! The page you're looking for doesn't exist.</p>
        <Link
          onClick={() => { navigate(-1) }}
          className="btn btn-outline-dark rounded-0 btn-lg"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Error404;
