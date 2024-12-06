import { useEffect, useState } from "react";
import { db } from "../../utils/firebase.js"; // Make sure Firebase is correctly initialized here
import { collection, getDocs } from "firebase/firestore";

const TicketPurchase = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [ticketType, setTicketType] = useState("oneWay");
  const [travelClass, setTravelClass] = useState("secondClass");
  const [price, setPrice] = useState(0);

  // Fetch routes from Firebase
  useEffect(() => {
    const fetchRoutes = async () => {
      const routeCollection = collection(db, "routes");
      const routeSnapshot = await getDocs(routeCollection);
      console.log("routes", routeSnapshot);

      const routeList = routeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoutes(routeList);
    };
    fetchRoutes();
  }, []);

  // Calculate price based on selection
  useEffect(() => {
    const route = routes.find((route) => route.routeId === selectedRoute);
    if (route) {
      const basePrice =
        ticketType === "oneWay" ? route.priceOneWay : route.priceRoundTrip;
      const classMultiplier =
        travelClass === "firstClass"
          ? route.classes.firstClass
          : route.classes.secondClass;
      setPrice(basePrice + classMultiplier);
    }
  }, [selectedRoute, ticketType, travelClass, routes]);

  return (
    <div>
      <h2>Purchase Ticket</h2>
      <form>
        <label>Choose Route:</label>
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
        >
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route.routeId} value={route.routeId}>
              {route.routeName}
            </option>
          ))}
        </select>

        <label>Ticket Type:</label>
        <select
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="oneWay">One-Way</option>
          <option value="roundTrip">Round Trip</option>
        </select>

        <label>Travel Class:</label>
        <select
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
        >
          <option value="firstClass">First Class</option>
          <option value="secondClass">Second Class</option>
        </select>

        <p>Price: ${price}</p>
        {/* Submit button to handle purchase */}
        <button type="submit">Purchase Ticket</button>
      </form>
    </div>
  );
};

export default TicketPurchase;
