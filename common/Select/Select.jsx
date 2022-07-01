import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Select = forwardRef(({ label, name, error, children, ...rest }, ref) => {
  return (
    <div ref={ref} className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
});

Select.displayName = "Select";

const { string } = PropTypes;
Select.propTypes = {
  label: string,
  name: string.isRequired,
};

export default Select;
