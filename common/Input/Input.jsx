import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(
  ({ label, name, containerClassnames, ...rest }, ref) => {
    return (
      <div ref={ref} className={containerClassnames}>
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
          name={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 mb-2"
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

const { string } = PropTypes;
Input.propTypes = {
  label: string,
  name: string.isRequired,
  containerClassnames: string,
};

export default Input;
