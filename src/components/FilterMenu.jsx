/* eslint-disable react/prop-types */
import { cloneElement, useRef, useState } from "react";
import Svg from "./Svg";
import Dropdown from "./Dropdown";

function FilterMenu({ target, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();

  const close = () => setIsOpen(false);
  return (
    <div className="relative hover:bg-primaryGrey-100 rounded-md px-3.5 py-2">
      <button
        ref={buttonRef}
        className="flex items-center gap-1.5 font-bold text-base"
        onClick={() => setIsOpen((state) => !state)}
      >
        {target} <Svg isOpen={isOpen} />
      </button>

      {isOpen && (
        <Dropdown setIsOpen={setIsOpen} buttonRef={buttonRef}>
          {cloneElement(children, { onCloseDropdown: close })}
        </Dropdown>
      )}
    </div>
  );
}

export default FilterMenu;
