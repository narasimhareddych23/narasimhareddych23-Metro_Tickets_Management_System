import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
// Import Firebase configuration

const routes = [
  {
    id: "route_id_1",
    routeName: "Route A",
    startStation: "Station 1",
    endStation: "Station 2",
    duration: "30 mins",
    distance: 10, // distance in kilometers
    ticketTypes: ["Economy", "Business"],
    metroName: "Metro A",
    availableTickets: 50,
    basePrice: 2, // base price per km
    createdAt: new Date(),
  },
  {
    id: "route_id_2",
    routeName: "Route B",
    startStation: "Station 2",
    endStation: "Station 3",
    duration: "25 mins",
    distance: 8,
    ticketTypes: ["Economy"],
    metroName: "Metro B",
    availableTickets: 30,
    basePrice: 2,
    createdAt: new Date(),
  },
  {
    id: "route_id_3",
    routeName: "Route C",
    startStation: "Station 3",
    endStation: "Station 4",
    duration: "20 mins",
    distance: 5,
    ticketTypes: ["Economy", "Business"],
    metroName: "Metro C",
    availableTickets: 20,
    basePrice: 2,
    createdAt: new Date(),
  },
];

// Function to seed the routes into Firestore
export const seedRoutes = async () => {
  try {
    const routesCollection = collection(db, "routes");

    // Check if routes collection already has data
    const routeQuery = query(routesCollection);
    const routeSnapshot = await getDocs(routeQuery);

    if (routeSnapshot.empty) {
      // If no routes are found, seed the routes data
      for (const route of routes) {
        await addDoc(routesCollection, route);
        console.log(`Route added: ${route.routeName}`);
      }
      console.log("Routes seeded successfully!");
    } else {
      console.log("Routes already exist in the database.");
    }
  } catch (error) {
    console.error("Error seeding routes:", error);
  }
};
