import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Authcontext } from "../Providers/AuthProvider";

const useCart = () => {
  const { user } = useContext(Authcontext);

  const {
    isLoading,
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/carts?email=${user?.email}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        return response.json();
      }
    },
  });
  return [cart, isLoading, refetch];
};
export default useCart;
