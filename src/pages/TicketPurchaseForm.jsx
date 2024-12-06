import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const TicketPurchaseForm = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [ticketType, setTicketType] = useState("oneWay");
  const [travelClass, setTravelClass] = useState("secondClass");

  // Fetch routes data from Firestore on component load
  useEffect(() => {
    const fetchRoutes = async () => {
      const routeCollection = collection(db, "routes");
      const routeSnapshot = await getDocs(routeCollection);
      const routeList = routeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoutes(routeList);
    };
    fetchRoutes();
  }, []);

  // Calculate ticket price based on selections
  const getTicketPrice = () => {
    if (!selectedRoute) return 0;
    const basePrice =
      ticketType === "oneWay"
        ? selectedRoute.priceOneWay
        : selectedRoute.priceRoundTrip;
    const classMultiplier =
      travelClass === "firstClass"
        ? selectedRoute.classes.firstClass
        : selectedRoute.classes.secondClass;
    return basePrice + classMultiplier;
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Purchase Ticket</h2>

      <form className="space-y-4">
        {/* Route Selection */}
        <div>
          <label className="block text-gray-700">Select Route</label>
          <select
            value={selectedRoute ? selectedRoute.routeId : ""}
            onChange={(e) =>
              setSelectedRoute(
                routes.find((route) => route.routeId === e.target.value)
              )
            }
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            <option value="" disabled>
              Select a Route
            </option>
            {routes.map((route) => (
              <option key={route.routeId} value={route.routeId}>
                {route.routeName}
              </option>
            ))}
          </select>
        </div>

        {/* Station Display */}
        {selectedRoute && (
          <div>
            <label className="block text-gray-700">Stations</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedRoute.stations.map((station, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {station}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ticket Type Selection */}
        <div>
          <label className="block text-gray-700">Ticket Type</label>
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            <option value="oneWay">One Way</option>
            <option value="roundTrip">Round Trip</option>
          </select>
        </div>

        {/* Travel Class Selection */}
        <div>
          <label className="block text-gray-700">Travel Class</label>
          <select
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            <option value="secondClass">Second Class</option>
            <option value="firstClass">First Class</option>
          </select>
        </div>

        {/* Price Display */}
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-lg font-semibold text-blue-700">
            Total Price: ₹{getTicketPrice()}
          </p>
        </div>

        {/* Purchase Button */}
        <button
          type="button"
          onClick={() => alert("Ticket Purchased!")} // Replace with actual purchase logic
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Purchase Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketPurchaseForm;
