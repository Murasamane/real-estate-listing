import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Button({
  text,
  buttonStyles,
  onClick = () => {},
  type = "button",
  href = "",
}) {
  const classes = `${buttonStyles}`;

  if (href !== "")
    return (
      <Link to={href} className={classes}>
        {text}
      </Link>
    );
  return (
    <button type={type} className={classes} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
