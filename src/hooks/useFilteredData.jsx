import { useQuery } from "@tanstack/react-query";
import { getAllEstates } from "../services/apiServices";
import { useFilters } from "../context/FilterContext";

export function useFilteredData() {
  const { state } = useFilters();
  const { data, isLoading } = useQuery({
    queryKey: ["estates"],
    queryFn: getAllEstates,
  });

  const isListingQualified = (listing) => {
    const { region, minPrice, maxPrice, minSpace, maxSpace, rooms } = state;

    const matchesRegion =
      region.length === 0 ||
      region.some((el) => el.id === listing.city.region_id);
    const matchesPrice =
      (minPrice === 0 || listing.price >= minPrice) &&
      (maxPrice === 0 || listing.price <= maxPrice);
    const matchesSpace =
      (minSpace === 0 || listing.area >= minSpace) &&
      (maxSpace === 0 || listing.area <= maxSpace);
    const matchesRooms = rooms === 0 || listing.bedrooms === rooms;

    return matchesRegion && matchesPrice && matchesSpace && matchesRooms;
  };

  // Apply filtering to the fetched data
  const filteredData = data ? data.filter(isListingQualified) : [];

  return { filteredData, isLoading };
}
