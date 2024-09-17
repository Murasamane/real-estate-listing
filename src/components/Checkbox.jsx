/* eslint-disable react/prop-types */
function Checkbox({ region, setFilterList, filterList }) {
  const isChecked = filterList.some((el) => el.name === region.name);

  function handleCheckbox() {
    if (isChecked) {
      let regions = filterList.filter((el) => el.id !== region.id);
      setFilterList(regions);
    } else {
      setFilterList((state) => [
        ...state,
        { id: region.id, name: region.name },
      ]);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={region.id}
        className="accent-primaryGreen-200 w-4 h-4"
        value={region.name}
        onChange={handleCheckbox}
        checked={isChecked}
      />
      <label htmlFor={region.id}>{region.name}</label>
    </div>
  );
}

export default Checkbox;
