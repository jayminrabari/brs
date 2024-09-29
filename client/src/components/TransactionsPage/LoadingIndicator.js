import React from "react";

const LoadingIndicator = ({ loading }) => {
  return loading ? <div>Loading...</div> : null;
};

export default LoadingIndicator;
