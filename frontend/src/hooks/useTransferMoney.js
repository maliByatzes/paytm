import { useState } from "react";
import toast from "react-hot-toast";

const useTransferMoney = () => {
  const [loading, setLoading] = useState(false);

  const transferMoney = async (userId, amount) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/accounts/transfer/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "amount": Number(amount) }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, transferMoney };
};

export default useTransferMoney;
