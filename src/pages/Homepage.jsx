import { useQuery } from "@tanstack/react-query";
import { getAllEstates } from "../services/apiServices";
import ListingCard from "../components/ListingCard";

export default function Homepage() {
  const { data, isLoading } = useQuery({
    queryKey: ["estates"],
    queryFn: getAllEstates,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-4 items-center flex-wrap gap-5">
      {data.map((list) => (
        <ListingCard key={list.id} data={list} />
      ))}
    </div>
  );
}
