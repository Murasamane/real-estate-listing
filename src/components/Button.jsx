/* eslint-disable react/prop-types */
function Button({ text, buttonStyles, onClick = () => {}, type = "button" }) {
  const classes = `${buttonStyles}`;
  return (
    <button type={type} className={classes} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
