import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faSubway,
  faTrain,
  faTaxi,
  faBicycle,
  faWalking,
} from "@fortawesome/free-solid-svg-icons";

const VehicleInput = ({updateVehicles}) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [vehicleName, setVehicleName] = useState("");

  const transportIcons = [
    { value: "bus", icon: faBus },
    { value: "subway", icon: faSubway },
    { value: "train", icon: faTrain },
    { value: "taxi", icon: faTaxi },
    { value: "bicycle", icon: faBicycle },
    { value: "walking", icon: faWalking },
  ];

  const handleIconChange = (e) => {
    setSelectedIcon(e.target.value);
  };

  const handleNameChange = (e) => {
    setVehicleName(e.target.value);
  };

const addVehicle = () => {
  if (selectedIcon && vehicleName) {
    const newVehicles = [...vehicles, { icon: selectedIcon, name: vehicleName }];
    setVehicles(newVehicles);
    updateVehicles(newVehicles);
    setSelectedIcon("");
    setVehicleName("");
  }
};

const removeVehicle = (index) => {
  const newVehicles = vehicles.filter((_, i) => i !== index);
  setVehicles(newVehicles);
  updateVehicles(newVehicles);
};

  return (
    <div className="container mx-auto">
      <div className="flex items-center space-x-2">
        <select
          value={selectedIcon}
          onChange={handleIconChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select transport icon</option>
          {transportIcons.map((transport) => (
            <option key={transport.value} value={transport.value}>
              {transport.value}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={vehicleName}
          onChange={handleNameChange}
          placeholder="Vehicle name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addVehicle}
          type="button" // Add this line to change the button type
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add
        </button>
      </div>

      <div className="mt-4">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mb-2"
          >
            <FontAwesomeIcon
              icon={
                transportIcons.find((t) => t.value === vehicle.icon).icon
              }
              className="text-xl"
            />
            <span>{vehicle.name}</span>
            <button
              onClick={() => removeVehicle(index)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleInput;
