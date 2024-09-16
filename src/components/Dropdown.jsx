import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */

function Dropdown({ setIsOpen, buttonRef, children }) {
  const ref = useRef();

  useEffect(() => {
    const handleRef = (e) => {
      if (!ref.current.contains(e.target) && e.target !== buttonRef.current) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleRef);
    return () => {
      document.removeEventListener("click", handleRef);
    };
  }, [buttonRef, setIsOpen]);
  return (
    <div className="-left-4 rounded-lg absolute bg-white top-10 z-50" ref={ref}>
      {children}
    </div>
  );
}

export default Dropdown;
