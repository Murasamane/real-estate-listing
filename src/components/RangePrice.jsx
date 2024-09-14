/* eslint-disable react/prop-types */
function RangePrice({ minPrice, maxPrice, dispatch }) {
  const handleClearPrice = () => dispatch({ type: "ClearPrice" });
  return (
    <div className="flex items-center gap-1 self-start text-primaryGrey-250 text-sm border-2 border-primaryGrey-200 rounded-[43px] px-2.5 py-1.5">
      <div>
        {minPrice} ₾ - {maxPrice} ₾
      </div>
      <button onClick={handleClearPrice}>X</button>
    </div>
  );
}

export default RangePrice;
