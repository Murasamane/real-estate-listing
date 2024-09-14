/* eslint-disable react/prop-types */
function RangeSpace({ minSpace, maxSpace, dispatch }) {
  const handleClearSpace = () => dispatch({ type: "ClearSpace" });
  return (
    <div className="flex items-center gap-1 self-start text-primaryGrey-250 text-sm border-2 border-primaryGrey-200 rounded-[43px] px-2.5 py-1.5">
      <div>
        {minSpace} მ<sup>2</sup> - {maxSpace} მ<sup>2</sup>
      </div>
      <button onClick={handleClearSpace}>X</button>
    </div>
  );
}

export default RangeSpace;
