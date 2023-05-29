import { Outlet } from "react-router-dom";
import SideNav from "../pages/Dashboard/SideNav/SideNav";

const DashbordLayout = () => {
  return (
    <>
      <section className="flex gap-6">
        <SideNav />
        <Outlet />
      </section>
    </>
  );
};

export default DashbordLayout;
