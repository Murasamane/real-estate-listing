/* eslint-disable react/prop-types */
function InputElement({
  register,
  errors,
  label,
  requirement,
  name,
  type,
  id,
}) {
  return (
    <div className="flex flex-col justify-center">
      <label htmlFor={id}>{label}*</label>
      <input
        type={type}
        name={name}
        id={id}
        className="border-2 border-primaryGrey-200 rounded-md p-2.5 w-96"
        {...register}
      />
      <p
        className={`flex items-center gap-2 mt-1 text-primaryBlack-300 text-sm ${
          errors ? "text-primaryRed-200" : ""
        }`}
      >
        <img src="./images/check.png" alt="check" /> {requirement}
      </p>
    </div>
  );
}

export default InputElement;
