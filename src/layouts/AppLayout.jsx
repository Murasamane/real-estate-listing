import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Filters from "../components/Filters";
import { useQuery } from "@tanstack/react-query";
import { getRegionsAndCities } from "../services/apiServices";

export default function AppLayout() {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getRegionsAndCities,
  });

  if (isLoading) return null;

  return (
    <div className="flex flex-col justify-center gap-20">
      <Header />
      <div className="px-7">
        <Filters regions={data.regions} />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
