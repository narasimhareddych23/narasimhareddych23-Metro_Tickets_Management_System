/* eslint-disable react/prop-types */
import { fetchUserBookings, cancelBooking } from "@/utils/firebaseUtils"; // Import the cancelBooking function
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadBookings = async () => {
      if (userId) {
        try {
          const fetchedBookings = await fetchUserBookings(userId);
          setBookings(fetchedBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          toast.error("Failed to load bookings.");
        }
      }
    };

    loadBookings();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmed) {
      return; // If the user cancels, do nothing
    }

    try {
      await cancelBooking(bookingId); // Update booking status to canceled in Firestore
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "canceled" } // Update status locally
            : booking
        )
      );
      toast.success("Booking canceled successfully.");
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  if (!bookings.length) {
    return <p className="text-sm text-gray-600">No bookings found.</p>;
  }

  return (
    <div className="bg-[url('/profilebg.jpg')] bg-cover bg-center">
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
      <h3 className="text-lg font-semibold text-center mt-2 text-white">
        Your Previous Bookings
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 p-5">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-2  rounded-lg shadow-sm bg-white/30 backdrop-blur-md border border-white/20 text-[12px]"
          >
            <p>
              <strong>Metro Name:</strong> {booking.metroName}
            </p>
            <p>
              <strong>Trip Type:</strong> {booking.tripType}
            </p>
            <p>
              <strong>From:</strong> {booking.fromStation}
            </p>
            <p>
              <strong>To:</strong> {booking.toStation}
            </p>
            <p>
              <strong>Ticket Type:</strong> {booking.ticketType}
            </p>
            <p>
              <strong>Number of Tickets:</strong> {booking.numberOfTickets}
            </p>
            <p>
              <strong>Price:</strong> ${booking.price}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  booking.status === "confirmed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {booking.status}
              </span>
            </p>
            <p>
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </p>
            {booking.status !== "canceled" && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="mt-2 px-2 py-1 bg-red-600 text-white rounded-md text-[12px] hover:bg-red-700"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
