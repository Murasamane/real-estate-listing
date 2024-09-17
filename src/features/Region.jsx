/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import { useFilters } from "../context/FilterContext";

function Region({ regions, onCloseDropdown }) {
  const { state, dispatch } = useFilters();
  const [filterList, setFilterList] = useState(state.region);

  function handleFilter() {
    dispatch({ type: "Region", payload: filterList });
    localStorage.setItem("regions", JSON.stringify(filterList));
    onCloseDropdown();
  }

  console.log(regions);
  return (
    <div className="grid px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md w-max">
      <h2 className="mb-6 font-bold">რეგიონის მიხედვით</h2>

      <div className="grid grid-cols-3 gap-x-16 gap-y-4">
        {regions.map((region) => (
          <Checkbox
            key={region.id}
            region={region}
            setFilterList={setFilterList}
            filterList={filterList}
          />
        ))}
      </div>
      <Button
        text={"არჩევა"}
        buttonStyles={
          "justify-self-end text-white bg-primaryRed-200 rounded-lg py-2 px-3.5 mt-8"
        }
        onClick={handleFilter}
      />
    </div>
  );
}

export default Region;
