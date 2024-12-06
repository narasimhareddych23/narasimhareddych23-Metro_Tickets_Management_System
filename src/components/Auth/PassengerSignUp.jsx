/* eslint-disable react/prop-types */

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signupPassenger } from "../../utils/firebase"; // Firebase signup function
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PassengerSignup = ({ setIsSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      // Firebase Signup
      const userCredential = await signupPassenger(
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        role: "passenger", // Default role
        createdAt: new Date().toISOString(),
      });

      toast.success("Signup successful!");
      localStorage.setItem("userId", user.uid);
      navigate("/passenger-dashboard");
      // Switch to Login form
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup Error:", err);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button className="bg-[#FF7F3E] text-white w-full">Sign Up</Button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <span
          className="text-[#4335A7] cursor-pointer"
          onClick={() => setIsSignup(false)}
        >
          Login here
        </span>
      </p>
    </form>
  );
};
