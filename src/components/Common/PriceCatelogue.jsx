import { useState, useEffect } from "react";
import { db } from "../../utils/firebase.js"; // Adjust the path to your Firebase config
import { collection, getDocs } from "firebase/firestore";
import RouteCard from "./RouteCard";

const TicketPricingCatalogue = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesCollection = collection(db, "routes");
        const routeSnapshot = await getDocs(routesCollection);
        const routesData = routeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoutes(routesData);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
};

export default TicketPricingCatalogue;
