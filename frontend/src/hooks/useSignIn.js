import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signin = async ({ username, password }) => {
    const success = validateInput({ username, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("site-user", JSON.stringify(data));
      setAuthUser(data);

      // toast.success('Successful login');
    } catch (error) {
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signin };
};

function validateInput({ username, password }) {
  if (!username || !password) {
    // toast.error('Provide all fields');
    return false;
  }
  return true;
}

export default useSignIn;
