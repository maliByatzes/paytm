import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-sm p-6">
      <h1 className="text-3xl text-center font-bold">
        Sign Up
      </h1>
      <p className="text-center text-gray-400 mb-6">
        Enter your information to create an account
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Label htmlFor="firstName" className="font-semibold">First Name</Label>
          <Input
            type="text"
            placeholder="John"
            name="firstName"
            onChange={handleInputChange}
            value={formData.firstName}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="lastName" className="font-semibold">Last Name</Label>
          <Input
            type="text"
            placeholder="Doe"
            name="lastName"
            onChange={handleInputChange}
            value={formData.lastName}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="username" className="font-semibold">Username</Label>
          <Input
            type="text"
            placeholder="johndoe"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="password" className="font-semibold">Password</Label>
          <Input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />
        </div>

        <Button className="w-full p-2">
          Sign Up
        </Button>
      </form>

      <p className="text-sm mt-2 text-center font-semibold">
        Already have an account? <Link to={"/signin"} className="underline">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
