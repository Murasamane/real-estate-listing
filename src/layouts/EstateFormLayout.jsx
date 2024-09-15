import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function EstateFormLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default EstateFormLayout;
