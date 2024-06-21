import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async ({ firstName, lastName, username, password }) => {
    const success = validateInput({ firstName, lastName, username, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, username, password })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success('Sign up complete, proceed to sign in');
      navigate('/signin');
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function validateInput({ firstName, lastName, username, password }) {
  if (!firstName || !lastName || !username || !password) {
    toast.error('All fields are required');
    return false;
  }

  if (firstName.length > 50) {
    toast.error('First name must be less than 50 characters');
    return false;
  }

  if (lastName.length > 50) {
    toast.error('Last name must be less than 50 characters');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  if (username.length < 3 || username.length > 30) {
    toast.error('Username must be between 3 and 30 characters');
    return false;
  }

  return true;
}

export default useSignUp;
