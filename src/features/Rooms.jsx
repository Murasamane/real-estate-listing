/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../components/Button";
import SelectButton from "../components/SelectButton";
import { useFilters } from "../context/FilterContext";

function Rooms({ onCloseDropdown }) {
  const { state, dispatch } = useFilters();
  const [room, setRoom] = useState(0);

  const handleSetRoom = (room) => setRoom(room);

  const handleRoomFilter = () => {
    dispatch({ type: "Rooms", payload: Number(room) });
    onCloseDropdown();
  };
  return (
    <div className="grid px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md w-max">
      <h2 className="mb-6 font-bold">საძინებლების რაოდენობა</h2>

      <div className="grid grid-cols-4 gap-3.5">
        <SelectButton
          roomValue={1}
          handleSetRoom={handleSetRoom}
          isActive={state.rooms}
        />
        <SelectButton
          roomValue={2}
          handleSetRoom={handleSetRoom}
          isActive={state.rooms}
        />
        <SelectButton
          roomValue={3}
          handleSetRoom={handleSetRoom}
          isActive={state.rooms}
        />
        <SelectButton
          roomValue={4}
          handleSetRoom={handleSetRoom}
          isActive={state.rooms}
        />
      </div>

      <Button
        text={"არჩევა"}
        buttonStyles={
          "justify-self-end text-white bg-primaryRed-200 rounded-lg py-2 px-3.5 mt-8 hover:bg-primaryRed-300"
        }
        onClick={handleRoomFilter}
      />
    </div>
  );
}

export default Rooms;
