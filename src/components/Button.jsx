/* eslint-disable react/prop-types */
function Button({ text, buttonStyles }) {
  const classes = `${buttonStyles}`;
  return (
    <button type="button" className={classes}>
      {text}
    </button>
  );
}

export default Button;
