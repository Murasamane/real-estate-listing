/* eslint-disable react/prop-types */
function RoomsFilter({ room, dispatch }) {
  const handleClearRooms = () => dispatch({ type: "ClearRooms" });
  return (
    <div className="flex items-center gap-1  text-primaryGrey-250 text-sm border-2 border-primaryGrey-200 rounded-[43px] px-2.5 py-1.5">
      <div>{room}</div>
      <button onClick={handleClearRooms}>X</button>
    </div>
  );
}

export default RoomsFilter;
