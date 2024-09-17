import { useQuery } from "@tanstack/react-query";
import { getAllEstates } from "../services/apiServices";
import ListingCard from "../components/ListingCard";
import { useFilters } from "../context/FilterContext";

export default function Homepage() {
  const { state } = useFilters();
  const { data, isLoading } = useQuery({
    queryKey: ["estates"],
    queryFn: getAllEstates,
  });

  console.log("Filter state:", state);

  if (isLoading) return <p>Loading...</p>;

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
    const matchesRooms = rooms === 0 || listing.rooms >= rooms;

    return matchesRegion && matchesPrice && matchesSpace && matchesRooms;
  };

  const filteredData = data.filter(isListingQualified);

  console.log(filteredData);
  return (
    <div className="grid grid-cols-4 items-center flex-wrap gap-5">
      {filteredData.length > 0 ? (
        filteredData.map((list) => <ListingCard key={list.id} data={list} />)
      ) : (
        <p className="text-xl text-primaryBlack-300/80 font-normal w-full col-span-4">
          აღნიშნული მონაცემებით განცხადება არ იძებნება.
        </p>
      )}
    </div>
  );
}
