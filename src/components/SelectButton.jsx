function SelectButton({ roomValue, handleSetRoom, isActive }) {
  return (
    <button
      className={`rounded-md border-2 border-primaryGrey-200 text-primaryGrey-200 px-2.5 py-3 ${
        isActive === roomValue && "bg-primaryRed-200 text-white"
      }`}
      onClick={() => handleSetRoom(roomValue)}
    >
      {roomValue}
    </button>
  );
}

export default SelectButton;
