import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignIn from "@/src/hooks/useSignIn";
import { Loader2 } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { loading, signin } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-sm p-6">
      <h1 className="text-3xl text-center font-bold">
        Sign In
      </h1>
      <p className="text-center text-gray-400 mb-6">
        Enter your information to sign in to an account
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Label htmlFor="username" className="font-semibold">Username</Label>
          <Input
            type="text"
            placeholder="johndoe"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="password" className="font-semibold">Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <Button className="w-full p-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
        </Button>
      </form>

      <p className="text-sm mt-2 text-center font-semibold">
        Don't have an account? <Link to={"/signup"} className="underline">Register</Link>
      </p>
    </div>
  );
};

export default SignIn;
