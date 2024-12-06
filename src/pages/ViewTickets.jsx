import { useState, useEffect } from "react";
import { db } from "../utils/firebase.js"; // Assuming you have a Firestore setup
import { collection, getDocs } from "firebase/firestore";

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsCollection = collection(db, "tickets");
      const ticketSnapshot = await getDocs(ticketsCollection);
      const ticketList = ticketSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(ticketList);
    };
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{ticket.metroName}</div>
            <p className="text-gray-700 text-base">
              <strong>Route:</strong> {ticket.route} <br />
              <strong>Price:</strong> ${ticket.price} <br />
              <strong>Status:</strong> {ticket.status} <br />
              <strong>Departure:</strong> {ticket.departureTime} <br />
              <strong>Arrival:</strong> {ticket.arrivalTime} <br />
              <strong>Date:</strong> {ticket.date} <br />
              <strong>Capacity:</strong> {ticket.passengerCapacity} passengers{" "}
              <br />
              <strong>Duration:</strong> {ticket.duration} mins
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewTickets;
