/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../components/Button";
import { useFilters } from "../context/FilterContext";

function Price({ onCloseDropdown }) {
  const { state, dispatch } = useFilters();
  const [minPrice, setMinPrice] = useState(state.minPrice);
  const [maxPrice, setMaxPrice] = useState(state.maxPrice);
  const handleMinPrice = (e) => setMinPrice(e.target.value);
  const handleMaxPrice = (e) => setMaxPrice(e.target.value);

  const handlePriceFilter = () => {
    dispatch({ type: "MinPrice", payload: minPrice });
    dispatch({ type: "MaxPrice", payload: maxPrice });
    onCloseDropdown();
  };
  return (
    <div className="grid px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md w-max">
      <h2 className="mb-6 font-bold">ფასის მიხედვით</h2>

      <div className="flex items-center gap-3.5">
        <div className="flex flex-col justify-center gap-6">
          <input
            type="number"
            placeholder="დან "
            className="rounded-md border-2 border-primaryGrey-200 px-2.5 py-3"
            value={minPrice}
            onChange={handleMinPrice}
          />

          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-bold text-sm">მინ.ფასი</h2>
            <ul className="flex flex-col gap-2">
              <li className="text-sm">50,000 ₾</li>
              <li className="text-sm">100,000 ₾</li>
              <li className="text-sm">150,000 ₾</li>
              <li className="text-sm">200,000 ₾</li>
              <li className="text-sm">300,000 ₾</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <input
            type="number"
            placeholder="მდე "
            className="rounded-md border-2 border-primaryGrey-200 px-2.5 py-3"
            value={maxPrice}
            onChange={handleMaxPrice}
          />
          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-bold text-sm">მაქს.ფასი</h2>
            <ul className="flex flex-col gap-2">
              <li className="text-sm">50,000 ₾</li>
              <li className="text-sm">100,000 ₾</li>
              <li className="text-sm">150,000 ₾</li>
              <li className="text-sm">200,000 ₾</li>
              <li className="text-sm">300,000 ₾</li>
            </ul>
          </div>
        </div>
      </div>
      <Button
        text={"არჩევა"}
        buttonStyles={
          "justify-self-end text-white bg-primaryRed-200 rounded-lg py-2 px-3.5 mt-8"
        }
        onClick={handlePriceFilter}
      />
    </div>
  );
}

export default Price;
