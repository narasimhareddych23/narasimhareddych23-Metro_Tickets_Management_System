import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Common/Navbar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Common/Footer";
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";

const PassengerDashboard = () => {
  const [firstName, setFirstName] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser; // Get the current user
        if (user) {
          const docRef = doc(db, "users", user.uid); // Adjust collection & doc ID if needed
          const userDoc = await getDoc(docRef);

          if (userDoc.exists()) {
            const fullName = userDoc.data().name; // Fetch `name` field
            const firstWord = fullName.split(" ")[0]; // Get the first word
            setFirstName(firstWord); // Update state with the first word
          } else {
            console.error("No such user document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsername();
  }, [auth, db]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-start">
        <div className="bg-[url('/banner-1.jpg')] bg-cover bg-center mb-6 h-[400px] w-[100%] p-6 md:h-[480px] ">
          <div className="flex justify-between flex-wrap">
            <p className="text-3xl text-white font-semibold text-start md:text-[60px] md:my-5">
              Hi {firstName}!<br />
              <div className="text-[14px] md:text-[35px] md:my-5">
                Welcome to your dashboard
              </div>
            </p>
            <div className=" w-full sm:w-[300px]">
              <img src={assets.card} className="w-[80%] rounded-[8px]" />
            </div>
          </div>
        </div>

        <div className=" max-w-lg space-y-4 mx-7">
          <Button
            onClick={() => navigate("bookings")}
            className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md"
          >
            My Bookings
          </Button>

          <Button
            onClick={() => navigate("ticket")}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
          >
            Book Ticket
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PassengerDashboard;
