import React from "react";
import { useSelector } from "react-redux";
import Alert from "@moon/common/Alert";

const Flash = (props) => {
  const flash = useSelector((state) => state.flash);

  if (!flash.show) return null;

  return <Alert message={flash.message} />;
};

export default Flash;
