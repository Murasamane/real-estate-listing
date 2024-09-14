/* eslint-disable react/prop-types */
export default function Svg({ isOpen }) {
  return (
    <img
      src="./images/arrow.svg"
      alt="arrow"
      className={`${isOpen && "rotate-180"}`}
    />
  );
}
