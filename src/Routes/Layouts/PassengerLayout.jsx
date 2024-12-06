import { Footer } from "@/components/Common/Footer";
import { Navbar } from "@/components/Common/Navbar";
import { Outlet } from "react-router-dom";

const PassengerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Nested routes will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default PassengerLayout;
