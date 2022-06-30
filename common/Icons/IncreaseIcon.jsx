import React from "react";
import PropTypes from "prop-types";
import { TrendingUpIcon, TrendingDownIcon } from "@heroicons/react/outline";

const IncreaseIcon = ({ value }) => {
  if (value > 0) {
    return <TrendingUpIcon className="w-4 h-4 mr-1 text-inherit" />;
  } else if (value === 0) return null;

  return <TrendingDownIcon className="w-4 h-4 mr-1 text-inherit" />;
};

const { number } = PropTypes;
IncreaseIcon.propTypes = {
  value: number.isRequired,
};

export default IncreaseIcon;
