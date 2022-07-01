import React, { useMemo } from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  className,
  startIcon,
  onClick,
  color,
  ...rest
}) => {
  const colors = useMemo(
    () => ({
      default:
        "text-slate-700 dark:text-white bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-700 disabled:bg-slate-400 disabled:text-slate-300",
      primary:
        "text-white bg-purple-600 hover:bg-purple-700 transition-colors disabled:bg-slate-400 disabled:text-slate-300",
    }),
    []
  );

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center py-2 px-3 text-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ${colors[color]} ${className}`}
      {...rest}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: "default",
};

Button.propTypes = {};

export default Button;
