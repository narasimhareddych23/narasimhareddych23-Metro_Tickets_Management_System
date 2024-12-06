// import { useState, useEffect } from "react";
// import { db } from "@/utils/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   Timestamp,
// } from "firebase/firestore";
// import { Button } from "@/components/ui/button";
// import { Navbar } from "./AdminDsPage";
// import { Footer } from "@/components/Common/Footer";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// const ManageRoutesPage = () => {
//   const [routes, setRoutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [ticketData, setTicketData] = useState({
//     routeName: "",
//     startStation: "",
//     endStation: "",
//     duration: "",
//     distance: "",
//     ticketTypes: [],
//     metroName: "",
//     availableTickets: 50,
//     basePrice: 2,
//   });

//   const fetchRoutes = async () => {
//     setLoading(true);
//     try {
//       const routesSnapshot = await getDocs(collection(db, "routes"));
//       const routesData = routesSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setRoutes(routesData);
//     } catch (error) {
//       console.error("Error fetching routes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTicketData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleAddRoute = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const routesRef = collection(db, "routes");
//       await addDoc(routesRef, {
//         ...ticketData,
//         createdAt: Timestamp.now(),
//       });
//       alert("Route added successfully!");
//       setTicketData({
//         routeName: "",
//         startStation: "",
//         endStation: "",
//         duration: "",
//         distance: "",
//         ticketTypes: [],
//         metroName: "",
//         availableTickets: 50,
//         basePrice: 2,
//       });
//       fetchRoutes();
//     } catch (error) {
//       console.error("Error adding route:", error);
//       alert("Error adding route.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteRoute = async (routeId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this route?"
//     );
//     if (confirmDelete) {
//       try {
//         const routeDocRef = doc(db, "routes", routeId);
//         await deleteDoc(routeDocRef);
//         alert("Route deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting route:", error);
//         alert("Error deleting route.");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchRoutes();
//   }, [routes]);

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-5xl mx-auto p-6">
//         <h3 className="text-2xl font-semibold mb-6 text-center">
//           Manage Routes
//         </h3>
//         <div className="flex justify-end mb-4">
//           <Dialog>
//             <DialogTrigger>
//               <Button className="bg-blue-500 text-white px-4 py-2 rounded">
//                 Add Route
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <form onSubmit={handleAddRoute} className="grid gap-4">
//                 <h4 className="text-xl font-medium mb-4">Add New Route</h4>
//                 <input
//                   type="text"
//                   name="routeName"
//                   value={ticketData.routeName}
//                   onChange={handleInputChange}
//                   placeholder="Route Name"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="startStation"
//                   value={ticketData.startStation}
//                   onChange={handleInputChange}
//                   placeholder="Start Station"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="endStation"
//                   value={ticketData.endStation}
//                   onChange={handleInputChange}
//                   placeholder="End Station"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="duration"
//                   value={ticketData.duration}
//                   onChange={handleInputChange}
//                   placeholder="Duration"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="distance"
//                   value={ticketData.distance}
//                   onChange={handleInputChange}
//                   placeholder="Distance"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="ticketTypes"
//                   value={ticketData.ticketTypes.join(", ")}
//                   onChange={(e) =>
//                     setTicketData({
//                       ...ticketData,
//                       ticketTypes: e.target.value.split(","),
//                     })
//                   }
//                   placeholder="Ticket Types (comma-separated)"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="metroName"
//                   value={ticketData.metroName}
//                   onChange={handleInputChange}
//                   placeholder="Metro Name"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="availableTickets"
//                   value={ticketData.availableTickets}
//                   onChange={handleInputChange}
//                   placeholder="Available Tickets"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="basePrice"
//                   value={ticketData.basePrice}
//                   onChange={handleInputChange}
//                   placeholder="Base Price"
//                   className="p-2 border border-gray-300 rounded"
//                   required
//                 />
//                 <Button type="submit" className="bg-blue-500 text-white">
//                   {loading ? "Saving..." : "Save Route"}
//                 </Button>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {routes.map((route) => (
//             <div key={route.id} className="p-4 bg-white shadow rounded text-xs">
//               <h4 className="font-bold text-sm">{route.routeName}</h4>
//               <p>From: {route.startStation}</p>
//               <p>To: {route.endStation}</p>
//               <p>Duration: {route.duration}</p>
//               <p>Distance: {route.distance} km</p>
//               <p>Tickets Available: {route.availableTickets}</p>
//               <p>Base Price: ${route.basePrice}</p>
//               <Button
//                 className="bg-red-500 text-white px-2 py-1 mt-2 text-xs"
//                 onClick={() => handleDeleteRoute(route.id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ManageRoutesPage;

import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Navbar } from "./AdminDsPage";
import { Footer } from "@/components/Common/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ManageRoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState({
    routeName: "",
    startStation: "",
    endStation: "",
    duration: "",
    distance: "",
    ticketTypes: [],
    metroName: "",
    availableTickets: 50,
    basePrice: 2,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRouteId, setEditRouteId] = useState(null);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const routesSnapshot = await getDocs(collection(db, "routes"));
      const routesData = routesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoutes(routesData);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOrUpdateRoute = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        // Update existing route
        const routeDocRef = doc(db, "routes", editRouteId);
        await updateDoc(routeDocRef, {
          ...ticketData,
          updatedAt: Timestamp.now(),
        });
        alert("Route updated successfully!");
        setIsEditMode(false);
        setEditRouteId(null);
      } else {
        // Add new route
        const routesRef = collection(db, "routes");
        await addDoc(routesRef, {
          ...ticketData,
          createdAt: Timestamp.now(),
        });
        alert("Route added successfully!");
      }
      setTicketData({
        routeName: "",
        startStation: "",
        endStation: "",
        duration: "",
        distance: "",
        ticketTypes: [],
        metroName: "",
        availableTickets: 50,
        basePrice: 2,
      });
      fetchRoutes();
    } catch (error) {
      console.error("Error adding/updating route:", error);
      alert("Error adding/updating route.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoute = async (routeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (confirmDelete) {
      try {
        const routeDocRef = doc(db, "routes", routeId);
        await deleteDoc(routeDocRef);
        alert("Route deleted successfully!");
        fetchRoutes(); // Refresh the route list
      } catch (error) {
        console.error("Error deleting route:", error);
        alert("Error deleting route.");
      }
    }
  };

  const handleEditRoute = (route) => {
    setTicketData(route);
    setEditRouteId(route.id);
    setIsEditMode(true);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Manage Routes
        </h3>
        <div className="flex justify-end mb-4">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                {isEditMode ? "Edit Route" : "Add Route"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddOrUpdateRoute} className="grid gap-4">
                <h4 className="text-xl font-medium mb-4">
                  {isEditMode ? "Edit Route" : "Add New Route"}
                </h4>
                <input
                  type="text"
                  name="routeName"
                  value={ticketData.routeName}
                  onChange={handleInputChange}
                  placeholder="Route Name"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="startStation"
                  value={ticketData.startStation}
                  onChange={handleInputChange}
                  placeholder="Start Station"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="endStation"
                  value={ticketData.endStation}
                  onChange={handleInputChange}
                  placeholder="End Station"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="duration"
                  value={ticketData.duration}
                  onChange={handleInputChange}
                  placeholder="Duration"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="distance"
                  value={ticketData.distance}
                  onChange={handleInputChange}
                  placeholder="Distance"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="ticketTypes"
                  value={ticketData.ticketTypes.join(", ")}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      ticketTypes: e.target.value.split(","),
                    })
                  }
                  placeholder="Ticket Types (comma-separated)"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="metroName"
                  value={ticketData.metroName}
                  onChange={handleInputChange}
                  placeholder="Metro Name"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="availableTickets"
                  value={ticketData.availableTickets}
                  onChange={handleInputChange}
                  placeholder="Available Tickets"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  name="basePrice"
                  value={ticketData.basePrice}
                  onChange={handleInputChange}
                  placeholder="Base Price"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <Button type="submit" className="bg-blue-500 text-white">
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Saving..."
                    : isEditMode
                    ? "Update Route"
                    : "Save Route"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div key={route.id} className="p-4 bg-white shadow rounded text-xs">
              <h4 className="font-bold text-sm">{route.routeName}</h4>
              <p>From: {route.startStation}</p>
              <p>To: {route.endStation}</p>
              <p>Duration: {route.duration}</p>
              <p>Distance: {route.distance} km</p>
              <p>Tickets Available: {route.availableTickets}</p>
              <p>Base Price: ${route.basePrice}</p>
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-yellow-500 text-white px-2 py-1 text-xs"
                  onClick={() => handleEditRoute(route)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 text-white px-2 py-1 text-xs"
                  onClick={() => handleDeleteRoute(route.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageRoutesPage;
