import React from "react";
import { toast, Slide } from "react-toastify";

const TOASTR_OPTIONS = {
  // position: toast.POSITION.BOTTOM_CENTER,
  transition: Slide,
  theme: "colored",
};

const ToastrComponent = ({ message }) => {
  return (
    <div className="flex flex-row items-start justify-start">
      <p className="mx-4 font-medium leading-5 text-white">{message}</p>
    </div>
  );
};

const showToastr = message => {
  toast.success(<ToastrComponent message={message} />, TOASTR_OPTIONS);
};

const isError = e => e && e.stack && e.message;

const showErrorToastr = error => {
  const errorMessage = isError(error) ? error.message : error;
  toast.error(<ToastrComponent message={errorMessage} />, TOASTR_OPTIONS);
};

const Toastr = {
  success: showToastr,
  error: showErrorToastr,
};

export default Toastr;