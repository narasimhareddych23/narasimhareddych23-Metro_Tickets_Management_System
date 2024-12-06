/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginPassenger } from "../../utils/firebase"; // Firebase login function
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { toast } from "react-toastify";

export const PassengerLogin = ({ setIsSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Firebase Login
      const userCredential = await loginPassenger(
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log(user);

      // Fetch role from Firestore
      const userDocRef = doc(db, "users", user.uid); // Get the user document reference
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role; // Get role from the Firestore document

        if (role) {
          // Save the user data or role to localStorage if needed
          localStorage.setItem("userRole", role);

          // Redirect based on role
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else if (role === "passenger") {
            toast.success("Welcome, passenger!");
            localStorage.setItem("userId", user.uid);
            navigate("/passenger-dashboard");
          }
        } else {
          setError("User role not found.");
        }
      } else {
        setError("No user data found.");
      }
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error("Login Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button className="bg-[#FF7F3E] text-white w-full">Login</Button>
      <p className="text-center text-sm">
        New to Metro Tickets?{" "}
        <span
          className="text-[#4335A7] cursor-pointer"
          onClick={() => setIsSignup(true)}
        >
          Sign Up here
        </span>
      </p>
    </form>
  );
};
