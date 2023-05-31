import { FaTrash } from "react-icons/fa";
import useUsers from "../../../hooks/useUsers";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { Authcontext } from "../../../Providers/AuthProvider";

const Allusers = () => {
  const [users, loading, refetch] = useUsers();
  const { user, deleteAUser } = useContext(Authcontext);
  const handleDelete = (id, uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteAUser(uid)
        //   .then(() => {
        // console.log("Successfully deleted user");
        fetch(`http://localhost:5000/user/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            refetch();
            Swal.fire(
              "successful!",
              "this item successfully deleted the user",
              "success"
            );
            // console.log(cartItems);
          });
        // })
        // .catch((error) => {
        //   console.log("Error deleting user:", error);
        // });
      }
    });
  };
  return (
    <div>
      {console.log(user)}
      <Helmet>
        <title>Bistro Boss || admin || all user</title>
      </Helmet>
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
                          className="w-10 h-10 object-cover"
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
                          onClick={() =>
                            handleDelete(cartItem._id, cartItem.uid)
                          }
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md"
                        >
                          <FaTrash />
                        </button>
                        {console.log(cartItem.uid)}
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
