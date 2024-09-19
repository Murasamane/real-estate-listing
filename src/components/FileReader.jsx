/* eslint-disable react/prop-types */
function FileReader({
  register,
  errors,
  label,
  requirement,
  name,
  id,
  preview = null,
}) {
  return (
    <div className="w-full">
      <p className="mb-2.5 font-bold text-base text-primaryBlack-400">
        {label} *
      </p>
      <label
        htmlFor={id}
        className="w-[800px] h-[120px] border-2 border-dotted border-primaryBlue-200 flex items-center justify-center rounded-lg"
      >
        {!preview ? (
          <img src="/images/plus.png" alt="file upload" />
        ) : (
          <img
            src={preview}
            width="92px"
            height="92px"
            className="rounded-md"
            alt="file upload"
          />
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id={id}
        name={name}
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
