import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Authcontext } from "../Providers/AuthProvider";

const useUsers = () => {
  const { user } = useContext(Authcontext);
  const {
    isLoading,
    refetch,
    data: users = [],
  } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/users`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        return response.json();
      }
    },
  });
  return [users, isLoading, refetch];
};
export default useUsers;
