/* eslint-disable react/prop-types */
function Button({ text, buttonStyles, onClick = () => {} }) {
  const classes = `${buttonStyles}`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
