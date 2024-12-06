// src/components/UpdateProfile.js
import { useState } from "react";

const ProfileDetails = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    // Logic to update profile in Firebase goes here
    console.log("Profile updated:", { email, phone });
  };

  return (
    <form onSubmit={handleUpdate} className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Update Personal Details</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-md w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone Number:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border rounded-md w-full p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default ProfileDetails;
