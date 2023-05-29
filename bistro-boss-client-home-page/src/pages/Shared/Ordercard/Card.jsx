import { useContext } from "react";
import { Authcontext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
// import withReactContent from 'sweetalert2-react-content'
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
const Card = ({ item }) => {
  const { user } = useContext(Authcontext);
  const navigate = useNavigate();
  const localtion = useLocation();
  const [, , refetch] = useCart();
  const { name, image, price, recipe, _id } = item;
  const handleAddToCart = (item) => {
    console.log(item);
    if (user && user?.email) {
      const cartItem = { itemId: _id, userEmail: user?.email };
      // console.log("added", cart);
      // console.log(cartItem);
      fetch(`http://localhost:5000/carts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
            refetch(); // refech the cart for live update
            Swal.fire({
              icon: "success",
              title: "Food added on the cart",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { pathname: localtion?.pathname } });
        }
      });
    }
  };
  return (
    <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
      <figure className="relative">
        <img src={image} alt="Shoes" />
        <div className="absolute top-[15px] right-[50px] text-white bg-slate-900 px-3 py-2 rounded">
          ${price}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
