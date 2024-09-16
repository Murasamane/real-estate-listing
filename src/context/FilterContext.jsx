/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const FilterContext = createContext();

const initialState = {
  region: [],
  minPrice: 0,
  maxPrice: 0,
  minSpace: 0,
  maxSpace: 0,
  rooms: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Region":
      return { ...state, region: action.payload };

    case "MinPrice":
      return { ...state, minPrice: action.payload };

    case "MaxPrice":
      return { ...state, maxPrice: action.payload };

    case "MinSpace":
      return { ...state, minSpace: action.payload };

    case "MaxSpace":
      return { ...state, maxSpace: action.payload };

    case "Rooms":
      return { ...state, rooms: action.payload };

    case "ClearRooms":
      return { ...state, rooms: 0 };

    case "ClearPrice":
      return { ...state, minPrice: 0, maxPrice: 0 };

    case "ClearSpace":
      return { ...state, minSpace: 0, maxSpace: 0 };

    case "ClearRegion": {
      const regions = state.region.filter((el) => el !== action.payload);
      return {
        ...state,
        region: regions,
      };
    }

    case "Clear":
      return initialState;
    default:
      return initialState;
  }
};

function FilterContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilters = () => {
  const context = useContext(FilterContext);

  return context;
};

export { FilterContextProvider, useFilters };
