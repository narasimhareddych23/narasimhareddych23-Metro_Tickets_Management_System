/* eslint-disable react/prop-types */
import { useState } from "react";

const RouteCard = ({ route }) => {
  const { start, end, basePrice, classes, tripTypeModifier } = route;
  const [selectedClass, setSelectedClass] = useState("economy");
  const [selectedTripType, setSelectedTripType] = useState("single");

  // Calculate price dynamically based on selections
  const calculatePrice = () => {
    const classMultiplier = classes[selectedClass];
    const tripTypeMultiplier = tripTypeModifier[selectedTripType];
    return basePrice * classMultiplier * tripTypeMultiplier;
  };

  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">
        {start} ➔ {end}
      </h3>
      <p>Base Price: ${basePrice.toFixed(2)}</p>

      {/* Travel Class Selection */}
      <div className="my-3">
        <label>Travel Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="ml-2 border rounded px-2 py-1"
        >
          {Object.keys(classes).map((className) => (
            <option key={className} value={className}>
              {className.charAt(0).toUpperCase() + className.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Trip Type Selection */}
      <div className="my-3">
        <label>Trip Type:</label>
        <select
          value={selectedTripType}
          onChange={(e) => setSelectedTripType(e.target.value)}
          className="ml-2 border rounded px-2 py-1"
        >
          {Object.keys(tripTypeModifier).map((tripType) => (
            <option key={tripType} value={tripType}>
              {tripType.charAt(0).toUpperCase() + tripType.slice(1)} Trip
            </option>
          ))}
        </select>
      </div>

      {/* Display Calculated Price */}
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold">
          Total Price: ${calculatePrice().toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default RouteCard;
