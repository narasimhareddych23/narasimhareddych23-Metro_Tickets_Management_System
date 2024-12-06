import { useState, useEffect } from "react";
import {
  createBooking,
  fetchRoutes,
  // updateAvailableTickets,
} from "../utils/firebaseUtils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [routes, setRoutes] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [ticketType, setTicketType] = useState("Economy");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [tripType, setTripType] = useState("Single");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const fetchedRoutes = await fetchRoutes();
        setRoutes(
          fetchedRoutes.map((route) => ({
            id: route.id,
            ...route,
            basePrice: route.basePrice,
            availableTickets: route.availableTickets,
            metroName: route.metroName,
          }))
        );
      } catch (error) {
        toast.error("Failed to load routes.");
        console.log(error);
      }
    };
    loadRoutes();
  }, []);

  useEffect(() => {
    const selectedRoute = routes.find(
      (route) =>
        route.startStation === fromStation && route.endStation === toStation
    );

    if (selectedRoute) {
      const basePrice = selectedRoute.basePrice;
      const distance = parseFloat(selectedRoute.distance);
      const tripMultiplier = tripType === "Round" ? 2 : 1;
      const ticketTypeMultiplier = ticketType === "Business" ? 1.5 : 1; // Business tickets are 1.5x cost
      const totalPrice =
        basePrice *
        distance *
        numberOfTickets *
        tripMultiplier *
        ticketTypeMultiplier;
      setPrice(totalPrice);
    }
  }, [fromStation, toStation, ticketType, numberOfTickets, tripType, routes]);

  const handleBooking = async () => {
    if (!userId) {
      toast.error("User is not logged in.");
      return;
    }

    if (!fromStation || !toStation || !paymentMethod || !price) {
      toast.error("Please complete all fields!");
      return;
    }

    setLoading(true);

    const selectedRoute = routes.find(
      (route) =>
        route.startStation === fromStation && route.endStation === toStation
    );

    console.log("Selected Route:", selectedRoute);

    if (!selectedRoute) {
      toast.error("Route not found.");
      setLoading(false);
      return;
    }

    if (selectedRoute.availableTickets < numberOfTickets) {
      toast.error("Not enough tickets available.");
      setLoading(false);
      return;
    }

    const bookingData = {
      userId,
      fromStation,
      toStation,
      ticketType,
      numberOfTickets,
      tripType,
      paymentMethod,
      price,
      metroName: selectedRoute.metroName,
      distance: selectedRoute.distance,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    console.log("Booking Data:", bookingData);

    try {
      const bookingId = await createBooking(bookingData);
      console.log("Booking ID:", bookingId);

      // await updateAvailableTickets(
      //   selectedRoute.id,
      //   selectedRoute.availableTickets - numberOfTickets
      // );

      toast.success(`Booking successful! ID: ${bookingId}`);
      navigate("/passenger-dashboard/bookings");
    } catch (error) {
      toast.error("Failed to book ticket!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/passenger-dashboard"
            className="text-xl font-bold text-teal-600"
          >
            Metro Tickets
          </Link>
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center bg-[url('/bg-booking.jpg')] bg-cover bg-center">
        <div className="p-4 max-w-lg mx-auto bg-white/30 backdrop-blur-md border border-white/20 rounded-[4px] shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-center text-white">
            Book Your Ticket
          </h2>
          <form className="space-y-2 text-xs">
            <div>
              <label className="block mb-1 font-medium text-white">
                From Station
              </label>
              <select
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="w-full p-2 border border-white/30 bg-white/20 rounded-md backdrop-blur-sm text-gray-800"
              >
                <option value="">Select From Station</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.startStation}>
                    {route.startStation}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-white">
                To Station
              </label>
              <select
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="w-full p-2 border border-white/30 bg-white/20 rounded-md backdrop-blur-sm text-gray-800"
              >
                <option value="">Select To Station</option>
                {routes
                  .filter((route) => route.startStation === fromStation)
                  .map((route) => (
                    <option key={route.id} value={route.endStation}>
                      {route.endStation}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="w-[50%]">
                <label className="block mb-1 font-medium text-white">
                  Trip Type
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full p-2 border border-white/30 bg-white/20 rounded-md backdrop-blur-sm text-gray-800"
                >
                  <option value="Single">Single</option>
                  <option value="Round">Round</option>
                </select>
              </div>

              <div className="w-[50%]">
                <label className="block mb-1 font-medium text-white">
                  Ticket Type
                </label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-full p-2 border border-white/30 bg-white/20 rounded-md backdrop-blur-sm text-gray-800"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[50%]">
                <label className="block mb-1 font-medium text-white">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  value={numberOfTickets}
                  onChange={(e) => setNumberOfTickets(e.target.value)}
                  min="1"
                  className="w-full p-2 border border-white/30 bg-white/20 rounded-md backdrop-blur-sm text-gray-800"
                />
              </div>

              <div className="w-[50%]">
                <label className="block mb-1 font-medium text-white">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-white/30 bg-white/20 rounded-md backdrop-blur-sm text-gray-800"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="font-bold text-lg text-white">
              Price: ${price.toFixed(2)}
            </div>

            <button
              type="button"
              onClick={handleBooking}
              disabled={loading}
              className="w-full p-3 mt-4 bg-blue-500/80 hover:bg-blue-600/90 text-white rounded-md shadow-md backdrop-blur-sm transition"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>

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

export default BookingForm;
