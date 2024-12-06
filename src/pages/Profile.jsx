import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateEmail, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { assets } from "@/assets/assets";

const ProfilePage = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setFormData(userDoc.data());
          } else {
            setError("User data not found.");
          }
        } catch (err) {
          setError("Failed to fetch user data. Please try again later.");
          console.error("Fetch Error:", err);
        }
      } else {
        setError("No user is logged in.");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("User is not logged in.");
        return;
      }

      // Update email in Firebase Authentication
      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      // Update the user data in Firestore
      await setDoc(doc(db, "users", user.uid), formData, { merge: true });

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setError("Please log in again to update your email.");
      } else {
        setError("Failed to update profile. Please try again.");
      }
      console.error("Update Error:", error);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/passenger-dashboard"
            className="text-xl font-bold text-teal-600"
          >
            Metro Tickets
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/profilebg.jpg')] bg-cover bg-center">
        <Card className="w-full max-w-md mx-4 bg-white/40 backdrop-blur-md border border-white/20">
          <CardHeader>
            <div className="w-20 h-20 rounded-full bg-[#134f87] relative bottom-[20px]">
              <img src={assets.profile} className="w-[79px]" />
            </div>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription className="text-white">
              {isEditing
                ? "Edit your profile information below."
                : "View and update your profile details."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-4">{success}</p>
            )}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-gray-300 hover:bg-gray-400"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <Button className="w-full" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Link
          to="/passenger-dashboard"
          className="mt-6 text-teal-600 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default ProfilePage;
