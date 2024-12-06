import { getBookings, getRoutes, getUsers } from "@/utils/firebaseUtils";
import { useState, useEffect } from "react";
import { Navbar } from "./AdminDsPage";
import { Footer } from "@/components/Common/Footer";

const SearchCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("users");
  const [allData, setAllData] = useState({
    users: [],
    bookings: [],
    routes: [],
  });
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        const bookings = await getBookings();
        const routes = await getRoutes();
        setAllData({ users, bookings, routes });
        setFilteredData(users); // Initially show users data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle category change (users, bookings, routes)
  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    setPage(1); // Reset to first page when category changes
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when search query changes
  };

  // Filter data based on search query
  useEffect(() => {
    if (searchCategory === "users") {
      filterData(allData.users);
    } else if (searchCategory === "bookings") {
      filterData(allData.bookings);
    } else if (searchCategory === "routes") {
      filterData(allData.routes);
    }
  }, [searchQuery, searchCategory, allData]);

  // Filter data based on category and query
  const filterData = (data) => {
    const filtered = data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // Set total pages
  };

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Get paginated data for the current page
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-4 my-5 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">Search</h3>
        {/* Search Form */}
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          placeholder="Search by name, ticket ID, or route"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchChange(e)}
        />

        {/* Category Selection */}
        <select
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
          value={searchCategory}
          onChange={handleCategoryChange}
        >
          <option value="users">Users</option>
          <option value="bookings">Bookings</option>
          <option value="routes">Routes</option>
        </select>

        {/* Search Results */}
        <div className="space-y-4 mt-4">
          {loading && (
            <div className="text-center text-gray-500">Loading...</div>
          )}
          {!loading && filteredData.length === 0 && (
            <div className="text-center text-gray-500">No results found.</div>
          )}

          {paginatedData.map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              {/* Render different fields for users, bookings, or routes */}
              {searchCategory === "users" && (
                <>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.email}</p>
                </>
              )}
              {searchCategory === "bookings" && (
                <>
                  <p className="text-sm font-semibold">Ticket ID: {item.id}</p>
                  <p className="text-xs text-gray-500">Status: {item.status}</p>
                </>
              )}
              {searchCategory === "routes" && (
                <>
                  <p className="text-sm font-semibold">
                    Route: {item.routeName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.routeDescription}
                  </p>
                </>
              )}
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
      </div>
      <Footer />
    </>
  );
};

export default SearchCard;
