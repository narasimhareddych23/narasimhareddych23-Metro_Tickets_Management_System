// /* eslint-disable react/prop-types */
// import { fetchUserBookings } from "@/utils/firebaseUtils";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const BookingHistory = ({ userId }) => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const loadBookings = async () => {
//       if (userId) {
//         try {
//           const fetchedBookings = await fetchUserBookings(userId);
//           setBookings(fetchedBookings);
//         } catch (error) {
//           console.error("Error fetching bookings:", error);
//           toast.error("Failed to load bookings.");
//         }
//       }
//     };

//     loadBookings();
//   }, [userId]);

//   if (!bookings.length) {
//     return <p>No bookings found.</p>;
//   }

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-4">Your Previous Bookings</h3>
//       <div className="space-y-4">
//         {bookings.map((booking) => (
//           <div
//             key={booking.id}
//             className="p-4 border rounded-lg shadow-md flex flex-col space-y-2"
//           >
//             <p>
//               <strong>From:</strong> {booking.fromStation}
//             </p>
//             <p>
//               <strong>To:</strong> {booking.toStation}
//             </p>
//             <p>
//               <strong>Ticket Type:</strong> {booking.ticketType}
//             </p>
//             <p>
//               <strong>Number of Tickets:</strong> {booking.numberOfTickets}
//             </p>
//             <p>
//               <strong>Price:</strong> ${booking.price}
//             </p>
//             <p>
//               <strong>Status:</strong> {booking.status}
//             </p>
//             <p>
//               <strong>Booking Date:</strong>{" "}
//               {new Date(booking.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookingHistory;
