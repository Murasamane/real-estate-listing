/* eslint-disable react/prop-types */
import React from "react";

const InputElement = React.forwardRef(
  ({ label, requirement, errors, name, type, id, register }, ref) => {
    return (
      <div className="flex flex-col justify-center">
        <label
          htmlFor={id}
          className="font-bold text-base text-primaryBlack-400 mb-1"
        >
          {label}*
        </label>
        <input
          type={type}
          name={name}
          id={id}
          className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
          ref={ref}
          {...register}
        />
        <p
          className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
            errors ? "text-primaryRed-200" : ""
          }`}
        >
          <img src="/images/check.png" alt="check" /> {requirement}
        </p>
      </div>
    );
  }
);

InputElement.displayName = "InputElement";

export default InputElement;
