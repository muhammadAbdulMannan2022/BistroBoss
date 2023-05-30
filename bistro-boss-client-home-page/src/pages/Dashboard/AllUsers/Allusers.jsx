import { FaTrash } from "react-icons/fa";
import useUsers from "../../../hooks/useUsers";
import Swal from "sweetalert2";

const Allusers = () => {
  const [users, loading, refetch] = useUsers();
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
    <div>
      {console.log(users)}
      <div className="pt-10 pe-5 md:pe-10 text-white">
        <div className="bg-gray-700 py-4 px-2 rounded">
          <div className="title uppercase gap-3 justify-between rounded flex">
            <h1 className="text-xl">total users : {users.length}</h1>
          </div>
          <div>
            <table className="min-w-full  divide-y mt-5 rounded divide-gray-200">
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
                    Roll
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {loading ? (
                <tbody className="flex min-w-full items-center justify-center py-10">
                  <tr
                    className="radial-progress motion-safe:animate-spin"
                    style={{
                      "--value": "40",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    }}
                  ></tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-500">
                  {users.map((cartItem, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">{i}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={cartItem?.photoURL}
                          alt={cartItem?.displayName}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span>{cartItem?.displayName}</span>
                        <br />
                        <span className="text-xs text-gray-400">
                          {cartItem?.email}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">user</td>
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
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
