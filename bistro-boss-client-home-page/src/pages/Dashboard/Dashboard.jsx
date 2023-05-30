import { Helmet } from "react-helmet-async";
import { FaHome, FaPhoneVolume, FaWallet } from "react-icons/fa";
// import useCartItems from "../../hooks/useCartItems";

const Dashboard = () => {
  const isAdmin = true;
  return (
    <div className="text-xl text-gray-900 font-semibold w-full">
      {isAdmin ? (
        ""
      ) : (
        <>
          <Helmet>
            <title>Bistro Boss || Dashboard</title>
          </Helmet>
          <h1 className="text-white font-bold mb-10 mt-5">Hi, Welcome Back!</h1>
          <div className="flex justify-center items-center gap-5 md:flex-row flex-wrap flex-col w-full">
            <div className="flex items-center justify-center text-white bg-gradient-to-l from-gray-700 to-gray-600 rounded px-20 py-7 gap-3 w-full md:w-auto shadow">
              <FaWallet className="h-7 w-7" />
              <h1 className="text-3xl">
                204 <p className="text-sm">Menu</p>
              </h1>
            </div>
            <div className="flex items-center justify-center text-white bg-gradient-to-l from-gray-700 to-gray-600 rounded px-20 py-7 gap-3 w-full md:w-auto shadow">
              <FaHome className="h-7 w-7" />
              <h1 className="text-3xl">
                104 <p className="text-sm">shop</p>
              </h1>
            </div>
            <div className="flex items-center justify-center text-white bg-gradient-to-l from-gray-700 to-gray-600 rounded px-20 py-7 gap-3 w-full md:w-auto shadow">
              <FaPhoneVolume className="h-7 w-7" />
              <h1 className="text-3xl">
                04 <p className="text-sm">Contact</p>
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
