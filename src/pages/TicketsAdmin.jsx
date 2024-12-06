import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Navbar } from "./AdminDsPage";

const TicketManagementPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsRef = collection(db, "bookings");
        const q = query(ticketsRef);
        const querySnapshot = await getDocs(q);

        const ticketsData = [];
        for (const docSnapshot of querySnapshot.docs) {
          const ticketData = { ...docSnapshot.data(), id: docSnapshot.id };
          const userDocRef = doc(db, "users", ticketData.userId);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            ticketData.passengerName = userData.name;
            ticketData.passengerEmail = userData.email;
          }

          ticketsData.push(ticketData);
        }
        setTickets(ticketsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleViewTicket = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    setSelectedTicket(ticket);
    setIsSheetOpen(true);
  };

  const handleDeleteTicket = async (ticketId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirmation) return;

    try {
      await deleteDoc(doc(db, "bookings", ticketId));
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      setIsSheetOpen(false);
      alert("Ticket deleted successfully.");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Error deleting ticket.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const paginatedTickets = tickets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <h2 className="text-xl font-semibold my-4 text-center">
        Available Tickets
      </h2>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-gray-200 text-[12px]">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">Metro Name</th>
                <th className="p-2 border-b">Ticket Type</th>
                <th className="p-2 border-b">From Station</th>
                <th className="p-2 border-b">To Station</th>
                <th className="p-2 border-b">Trip Type</th>
                <th className="p-2 border-b">Total Price</th>
                <th className="p-2 border-b">Number of Tickets</th>
                <th className="p-2 border-b">Payment Method</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-2 border-b">{ticket.metroName}</td>
                  <td className="p-2 border-b">{ticket.ticketType}</td>
                  <td className="p-2 border-b">{ticket.fromStation}</td>
                  <td className="p-2 border-b">{ticket.toStation}</td>
                  <td className="p-2 border-b">{ticket.tripType}</td>
                  <td className="p-2 border-b">${ticket.price}</td>
                  <td className="p-2 border-b">{ticket.numberOfTickets}</td>
                  <td className="p-2 border-b">{ticket.paymentMethod}</td>
                  <td className="p-2 border-b">{ticket.status}</td>
                  <td className="p-2 border-b">
                    <Button
                      onClick={() => handleViewTicket(ticket.id)}
                      className="bg-blue-500 text-white text-[12px]"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 text-center">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              className={`px-3 py-1 mx-2 ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              className={`px-3 py-1 mx-2 ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedTicket && (
        <Sheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
          <SheetContent>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Ticket Details</h3>
              <div className="mb-4">
                <strong>Ticket Type:</strong> {selectedTicket.ticketType}
              </div>
              <div className="mb-4">
                <strong>From Station:</strong> {selectedTicket.fromStation}
              </div>
              <div className="mb-4">
                <strong>To Station:</strong> {selectedTicket.toStation}
              </div>
              <div className="mb-4">
                <strong>Price:</strong> ${selectedTicket.price}
              </div>
              <div className="mb-4">
                <strong>Number of Tickets:</strong>{" "}
                {selectedTicket.numberOfTickets}
              </div>
              <div className="mb-4">
                <strong>Payment Method:</strong> {selectedTicket.paymentMethod}
              </div>
              <div className="mb-4">
                <strong>Passenger Details:</strong>
                <div className="ml-4">
                  <p>
                    <strong>Name:</strong> {selectedTicket.passengerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedTicket.passengerEmail}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => handleDeleteTicket(selectedTicket.id)}
                className="bg-red-500 text-white text-[12px] mr-5"
              >
                Delete
              </Button>
              <Button
                className="mt-4 bg-gray-500 text-white"
                onClick={() => setIsSheetOpen(false)}
              >
                Close
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default TicketManagementPage;
