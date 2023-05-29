import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { Authcontext } from "../../../Providers/AuthProvider";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const [opacity, setOpacity] = useState(50);
  const { user, logOut } = useContext(Authcontext);
  const [cart] = useCart();
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order">Order Food</Link>
      </li>
      {user ? (
        <>
          <li onClick={logOut}>
            <button>Log out</button>
          </li>
          <li className="w-10 h-10 rounded-full bg-white border-none outline-none">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-10 h-10 rounded-full overflow-hidden"
            />
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </>
      )}
    </>
  );
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY >= 200) {
        setOpacity(80);
      } else if (window.scrollY >= 160) {
        setOpacity(70);
      } else if (window.scrollY >= 100) {
        setOpacity(65);
      } else {
        setOpacity(60);
      }
    });
  }, []);
  return (
    <>
      <div
        className={`navbar fixed z-10 bg-black bg-opacity-${opacity} text-white transition-opacity`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end gap-2">
          <div className="relative">
            <Link to="/">
              <HiShoppingCart className="w-7 h-7" />
              <div className="absolute h-[20px] w-[20px] flex items-center justify-center rounded-full -top-2 -right-2 bg-red-600 text-black">
                {cart ? (cart?.length >= 100 ? `${99}+` : cart?.length) : 0}
              </div>
            </Link>
          </div>
          <a className="btn">Get started</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
