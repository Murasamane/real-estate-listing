/* eslint-disable react/prop-types */
function FileReader({ register, errors, label, requirement, name, id }) {
  return (
    <div className="w-full">
      <p className="mb-2.5 font-medium text-primaryBlack-300 text-sm">
        {label} *
      </p>
      <label
        htmlFor={id}
        className="w-[800px] h-[120px] border-2 border-dotted border-primaryBlue-200 flex items-center justify-center rounded-lg"
      >
        <img src="./images/plus.png" alt="file upload" />
      </label>
      <input
        type="file"
        accept="image/*"
        id={id}
        name={name}
        src="./images/plus.png"
        className="w-0 h-0"
        {...register}
      />
      {errors && (
        <p
          className={`flex items-center gap-2 mt-1 text-primaryRed-200 text-sm`}
        >
          {requirement}
        </p>
      )}
    </div>
  );
}

export default FileReader;
