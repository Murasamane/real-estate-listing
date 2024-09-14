/* eslint-disable react/prop-types */
function Checkbox({ region, setFilterList, filterList }) {
  const isChecked = filterList.includes(region);

  function handleCheckbox(e) {
    if (isChecked) {
      let regions = filterList.filter((el) => el !== e.target.value);
      setFilterList(regions);
    } else {
      setFilterList((state) => [...state, e.target.value]);
    }
  }
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={region}
        className="accent-primaryGreen-200 w-4 h-4"
        value={region}
        onChange={handleCheckbox}
        checked={isChecked}
      />
      <label htmlFor={region}>{region}</label>
    </div>
  );
}

export default Checkbox;
