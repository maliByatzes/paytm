import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async (filterName) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/users/bulk/?filter=${filterName}`);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers(""); // pass an empty string for now
  }, [users])

  return { loading, users };
};

export default useGetUsers;
