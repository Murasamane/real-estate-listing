/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../components/Button";
import { useFilters } from "../context/FilterContext";

function Space({ onCloseDropdown }) {
  const { filters, setFilters } = useFilters();
  const [minSpace, setMinSpace] = useState(filters.minSpace);
  const [maxSpace, setMaxSpace] = useState(filters.maxSpace);
  const handleMinSpace = (e) => setMinSpace(e.target.value);
  const handleMaxSpace = (e) => setMaxSpace(e.target.value);

  const handleSpaceFilter = () => {
    setFilters((state) => ({
      ...state,
      maxSpace: maxSpace,
      minSpace: minSpace,
    }));
    onCloseDropdown();
  };
  return (
    <div className="grid px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md w-max">
      <h2 className="mb-6 font-bold">ფართობის მიხედვით</h2>

      <div className="flex items-center gap-3.5">
        <div className="flex flex-col justify-center gap-6">
          <input
            type="number"
            placeholder="დან "
            className="rounded-md border-2 border-primaryGrey-200 px-2.5 py-3"
            value={minSpace}
            onChange={handleMinSpace}
          />

          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-bold text-sm ">
              მინ.მ <sup>2</sup>
            </h2>
            <ul className="flex flex-col gap-2">
              <li className="text-sm">
                50,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                100,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                150,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                200,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                300,000 მ<sup>2</sup>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <input
            type="number"
            placeholder="მდე "
            className="rounded-md border-2 border-primaryGrey-200 px-2.5 py-3"
            value={maxSpace}
            onChange={handleMaxSpace}
          />
          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-bold text-sm ">
              მაქს.მ <sup>2</sup>
            </h2>
            <ul className="flex flex-col gap-2">
              <li className="text-sm">
                50,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                100,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                150,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                200,000 მ<sup>2</sup>
              </li>
              <li className="text-sm">
                300,000 მ<sup>2</sup>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button
        text={"არჩევა"}
        buttonStyles={
          "justify-self-end text-white bg-primaryRed-200 rounded-lg py-2 px-3.5 mt-8"
        }
        onClick={handleSpaceFilter}
      />
    </div>
  );
}

export default Space;