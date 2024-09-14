/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const FilterContext = createContext();

function FilterContextProvider({ children }) {
  const [filters, setFilters] = useState({
    region: [],
    minPrice: 0,
    maxPrice: 0,
    minSpace: 0,
    maxSpace: 0,
    rooms: 0,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilters = () => {
  const context = useContext(FilterContext);

  return context;
};

export { FilterContextProvider, useFilters };
