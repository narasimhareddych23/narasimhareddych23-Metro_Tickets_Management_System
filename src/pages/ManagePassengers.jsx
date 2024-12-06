import { fetchUserBookings, getUsers } from "@/utils/firebaseUtils";
import { useState, useEffect } from "react";
import { Navbar } from "./AdminDsPage";
import { Footer } from "@/components/Common/Footer";
import * as Dialog from "@radix-ui/react-dialog"; // Import Dialog from Radix UI
import { Button } from "@/components/ui/button";

const ManagePassengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [ticketHistory, setTicketHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [openDialog, setOpenDialog] = useState(false); // Track dialog open state
  const [selectedPassengerId, setSelectedPassengerId] = useState(null); // Track selected passenger

  // Fetch all passengers (users)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        setPassengers(users);
        setTotalPages(Math.ceil(users.length / itemsPerPage)); // Calculate total pages
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passengers:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch ticket history for a specific passenger
  const fetchTicketHistory = async (userId) => {
    try {
      const tickets = await fetchUserBookings(userId);
      setTicketHistory((prevState) => ({
        ...prevState,
        [userId]: tickets,
      }));
      setSelectedPassengerId(userId); // Set selected passenger ID
      setOpenDialog(true); // Open the dialog to show ticket history
    } catch (error) {
      console.error("Error fetching ticket history:", error);
    }
  };

  // Handle pagination page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Get paginated passenger data
  const paginatedPassengers = passengers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="max-w-6xl my-4 mx-auto p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Manage Passengers
          </h3>

          {/* Display Loading Indicator */}
          {loading && (
            <div className="text-center text-gray-500">Loading...</div>
          )}

          {/* Display Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPassengers.map((passenger) => (
              <div
                key={passenger.id}
                className="p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <p className="text-lg font-semibold">{passenger.name}</p>
                <p className="text-sm text-gray-600">{passenger.email}</p>
                <Button
                  className="mt-2 text-blue-500"
                  onClick={() => fetchTicketHistory(passenger.id)}
                >
                  View Ticket History
                </Button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 text-center">
            <button
              className="px-3 py-1 bg-gray-300 rounded-lg mr-2"
              onClick={() => page > 1 && handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-xs">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-gray-300 rounded-lg ml-2"
              onClick={() => page < totalPages && handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>

          {/* Shadcn Dialog for Ticket History */}
          <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.Trigger asChild>
              {/* Hidden trigger, manually open dialog on button click */}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
              <Dialog.Content className="fixed top-14 h-[70%] overflow-auto left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-96 z-50">
                <Dialog.Title className="text-xl font-semibold mb-4">
                  Ticket History
                </Dialog.Title>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setOpenDialog(false)}
                >
                  X
                </button>

                {/* Display Ticket History for Selected Passenger */}
                {ticketHistory[selectedPassengerId] &&
                ticketHistory[selectedPassengerId].length > 0 ? (
                  <div>
                    {ticketHistory[selectedPassengerId].map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-2 bg-gray-100 mt-2 rounded-md shadow-sm"
                      >
                        <p className="text-xs">Ticket ID: {ticket.id}</p>
                        <p className="text-xs">Status: {ticket.status}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    No tickets found for this passenger.
                  </p>
                )}
              </Dialog.Content>
              {/* <Dialog.Close asChild>
                <Button className="mt-4 w-full bg-blue-500 text-white">
                  Close
                </Button>
              </Dialog.Close> */}
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManagePassengers;
