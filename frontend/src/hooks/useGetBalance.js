import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const useGetBalance = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/accounts/balance');
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setBalance(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getBalance();
  }, [balance]);

  return { loading, balance };
};

export default useGetBalance;
