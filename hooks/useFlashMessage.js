import { clearFlash, showFlash } from "@moon/features/Flash/flashSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFlashMessage = (error) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(showFlash({ message: error.message, type: "error" }));
    }

    return () => {
      dispatch(clearFlash());
    };
  }, [error, dispatch]);

  return error;
};

export default useFlashMessage;
