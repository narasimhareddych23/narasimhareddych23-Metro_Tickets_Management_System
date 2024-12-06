import { useEffect, useState } from "react";
import trainLogo from "../assets/train_logo.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLogin } from "@/components/Auth/AdminLogin";
import { PassengerSignup } from "@/components/Auth/PassengerSignUp";
import { PassengerLogin } from "@/components/Auth/PassengerLogin";
// import { seedRoutes } from "@/data/routeSeeder";
import { useAuth } from "@/context/AuthContext";
import { assets } from "@/assets/assets";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [activeTab, setActiveTab] = useState("passenger"); // Default to passenger tab
  const [loading, setLoading] = useState(true); // Loading state
  const { role } = useAuth(); // Access the user and role from AuthContext
  // For redirection

  useEffect(() => {
    const initializeAuthPage = async () => {
      try {
        // Seed routes for testing/demo purposes
        // await seedRoutes();

        // Set active tab based on user role
        if (role === "admin") {
          setActiveTab("admin");
        } else {
          setActiveTab("passenger");
        }
      } catch (error) {
        console.error("Error initializing AuthPage:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuthPage();
  }, [role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#80C4E9] gap-4 flex-col ">
        <img src={trainLogo} alt="Metro Tickets System Logo" className="w-14" />
        <p className="text-[14px] font-normal text-white">
          Metro Tickets Systems
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-screen">
      <div className="md:w-[40%] hidden md:block h-full">
        <img src={assets.loginBg1} alt="Metro Tickets System Logo" />
      </div>
      <div className="w-[100%] md:w-[60%] bg-slate-400 bg-[url('/Login-bg2.jpg')] bg-cover bg-center flex items-center justify-center">
        <Card className=" w-[320px] md:w-[420px] shadow-lg bg-[#FFF6E9] rounded-lg">
          <CardHeader className="flex justify-center items-center">
            <img
              src={trainLogo}
              alt="Metro Tickets System Logo"
              className="w-14"
            />
            <p className="text-[16px] font-semibold">Metro Tickets Systems</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex justify-center mb-6">
                <TabsTrigger
                  value="passenger"
                  aria-label="Passenger Authentication"
                  className="w-full text-center text-[#FF7F3E] hover:text-black transition-all"
                >
                  Passenger
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  aria-label="Admin Authentication"
                  className="w-full text-center text-[#FF7F3E] hover:text-black transition-all"
                >
                  Admin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="passenger">
                {isSignup ? (
                  <PassengerSignup setIsSignup={setIsSignup} />
                ) : (
                  <PassengerLogin setIsSignup={setIsSignup} />
                )}
              </TabsContent>
              <TabsContent value="admin">
                <AdminLogin />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
