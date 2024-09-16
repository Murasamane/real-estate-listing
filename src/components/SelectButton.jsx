function SelectButton({ roomValue, handleSetRoom, isActive }) {
  return (
    <button
      className={`rounded-md border-2 border-primaryGrey-200 text-primaryGrey-200 px-2.5 py-3 hover:bg-primaryRed-300 hover:text-white hover:border-primaryRed-300 focus:border-primaryRed-300 focus:bg-primaryRed-300 focus:text-white ${
        isActive === roomValue &&
        "bg-primaryRed-200 border-primaryRed-300 text-white "
      }`}
      onClick={() => handleSetRoom(roomValue)}
    >
      {roomValue}
    </button>
  );
}

export default SelectButton;
