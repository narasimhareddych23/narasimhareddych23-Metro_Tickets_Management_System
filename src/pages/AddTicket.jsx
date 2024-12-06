import { useState } from "react";
// import { toast } from "react-toastify"; // For notifications
// import { addTicketToFirebase } from "../utils/firebase.js"; // Function to handle Firebase interaction

const AddTicket = () => {
  const [ticketData, setTicketData] = useState({
    metroName: "",
    routeName: "",
    departureStation: "",
    arrivalStation: "",
    travelClass: "",
    price: "",
    availableSeats: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    dateOfTravel: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   // Function to add ticket to Firebase
    //   await addTicketToFirebase(ticketData);
    //   toast.success("Ticket added successfully!");
    //   setTicketData({
    //     // Reset form after submission
    //     metroName: "",
    //     routeName: "",
    //     departureStation: "",
    //     arrivalStation: "",
    //     travelClass: "",
    //     price: "",
    //     availableSeats: "",
    //     departureTime: "",
    //     arrivalTime: "",
    //     duration: "",
    //     dateOfTravel: "",
    //     additionalNotes: "",
    //   });
    // } catch (error) {
    //   toast.error("Failed to add ticket. Please try again.");
    //   console.error("Error adding ticket:", error);
    // }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Ticket</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(ticketData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                key.includes("Time") || key.includes("Date")
                  ? "datetime-local"
                  : "text"
              }
              name={key}
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
              value={ticketData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
