import { useQuery } from "@tanstack/react-query";
import { getAllEstates } from "../services/apiServices";

export default function Homepage() {
  const { data, isLoading } = useQuery({
    queryKey: ["estates"],
    queryFn: getAllEstates,
  });

  if (isLoading) return <p>Loading...</p>;

  console.log(data);
  return <div>Hello Listers</div>;
}
