/* eslint-disable react/prop-types */
function FilterTag({ region, dispatch }) {
  const handleRegionClear = () =>
    dispatch({ type: "ClearRegion", payload: region });
  return (
    <div className="flex items-center gap-1 self-start text-primaryGrey-250 text-sm border-2 border-primaryGrey-200 rounded-full px-2.5 py-1.5 ">
      <div>{region}</div>
      <button onClick={handleRegionClear}>X</button>
    </div>
  );
}

export default FilterTag;
