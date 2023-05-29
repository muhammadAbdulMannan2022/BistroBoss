import useCartItems from "../../../hooks/useCartItems";
import { Helmet } from "react-helmet-async";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cartItems, , refetch] = useCartItems();
  const total = cartItems.reduce((sum, item) => item.price + sum, 0);
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/carts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        Swal.fire(
          "successful!",
          "this item successfully removed from the cart",
          "success"
        );
        // console.log(cartItems);
      });
  };
  return (
    <div className="text-xl text-gray-900 font-semibold w-full">
      <Helmet>
        <title>Bistro Boss || My cart</title>
      </Helmet>
      <h1 className="text-white font-bold mb-10 mt-5">Hi, Welcome Back!</h1>

      <div className="pt-10 pe-5 md:pe-10 text-white">
        <div className="bg-gray-700 py-4 px-2 rounded">
          <div className="title uppercase gap-3 justify-between rounded flex">
            <h1 className="text-xl">total orders : {cartItems.length}</h1>
            <h1 className="text-xl">Total Price : ${total.toFixed(2)}</h1>
            <Link className="btn btn-warning btn-sm">buy</Link>
          </div>
          <div>
            <table className="min-w-full divide-y mt-5 rounded divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500">
                {cartItems.map((cartItem, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">{i}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={cartItem?.image}
                        alt={cartItem?.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cartItem?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${cartItem?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(cartItem._id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
