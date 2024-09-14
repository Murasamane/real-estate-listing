/* eslint-disable react/prop-types */
function FilterTag({ children }) {
  return (
    <div className="flex items-center gap-1 self-start text-primaryGrey-250 text-sm border-2 border-primaryGrey-200 rounded-full px-2.5 py-1.5">
      {children}
      <span>X</span>
    </div>
  );
}

export default FilterTag;
