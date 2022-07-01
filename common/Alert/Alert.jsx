import React from "react";
import PropTypes from "prop-types";

const Alert = ({ message }) => {
  return (
    <div className="p-4">
      <div
        className="p-4 mb-4 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-500 dark:text-white overflow-hidden"
        role="alert"
      >
        <span className="font-medium mr-4">Error</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

const { string } = PropTypes;
Alert.propTypes = {
  message: string.isRequired,
};

export default Alert;
