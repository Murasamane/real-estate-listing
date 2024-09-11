import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Filters from "../components/Filters";

export default function AppLayout() {
  return (
    <div className="flex flex-col justify-center gap-20">
      <Header />
      <div className="px-7">
        <Filters />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
