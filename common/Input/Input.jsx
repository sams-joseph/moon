import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, name, containerClassnames, ...rest }) => {
  return (
    <div className={containerClassnames}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        {...rest}
      />
    </div>
  );
};

const { string } = PropTypes;
Input.propTypes = {
  label: string,
  name: string.isRequired,
  containerClassnames: string,
};

export default Input;