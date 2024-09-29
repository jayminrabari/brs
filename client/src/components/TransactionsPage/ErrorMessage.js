import React from "react";

const ErrorMessage = ({ error }) => {
  return error ? <div className="alert alert-danger">{error}</div> : null;
};

export default ErrorMessage;
