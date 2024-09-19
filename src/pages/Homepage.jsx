import ListingCard from "../components/ListingCard";
import { useFilteredData } from "../hooks/useFilteredData";

export default function Homepage() {
  const { filteredData, isLoading } = useFilteredData();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-4 items-center justify-items-center flex-wrap gap-5">
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
