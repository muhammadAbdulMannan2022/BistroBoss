import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdRateReview, MdEmail } from "react-icons/md";
import { FaHome, FaShoppingBag, FaWallet } from "react-icons/fa";
import { BiMessageCheck } from "react-icons/bi";
import { FiShoppingCart, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
const SideNav = () => {
  const [open, setOpen] = useState(true);
  const menus = [
    { name: "dashboard", link: "/dashbord", icon: MdOutlineDashboard },
    { name: "RESERVATION", link: "/dashbord/reservation", icon: FiCalendar },
    {
      name: "PAYMENT HISTORY",
      link: "/dashbord/paymenthistory",
      icon: FaWallet,
    },
    { name: "MY CART", link: "/dashbord/mycart", icon: FiShoppingCart },
    { name: "ADD REVIEW", link: "/dashbord/addreview", icon: MdRateReview },
    { name: "MY BOOKING", link: "/dashbord/mybooking", icon: BiMessageCheck },
    { name: "HOME", link: "/", icon: FaHome, margin: true },
    { name: "MENU", link: "/menu", icon: HiMenuAlt3 },
    { name: "SHOP", link: "/order", icon: FaShoppingBag },
    { name: "CONTACT", link: "/contact", icon: MdEmail },
  ];
  return (
    <>
      <div
        className={`bg-gray-900 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "pt-5 mt-2 border-t"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
