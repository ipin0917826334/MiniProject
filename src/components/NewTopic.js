import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { addNewTopic } from "../mockData";
import VehicleInput from "./VehicleInput"; // Import the VehicleInput component
import api from "../services/api";

function NewTopic({ userData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [author, setAuthor] = useState(userData.name);
  const [vehicles, setVehicles] = useState([]);
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const updateVehicles = (vehicles) => {
    setVehicles(vehicles);
    console.log(vehicles);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const newTopic = {
      title,
      description,
      likes,
      dislikes,
      posts: [],
      author,
      start,
      vehicles,
      destination,
    };

    try {
      const response = await api.post("/topics", newTopic);
      console.log("Response:", response); // Add this line to log the response
      navigate(`/topic/${response.data._id}`);
    } catch (error) {
      console.error("Error creating new topic:", error);
    }
  }

  return (
    <div className="new-topic p-4">
      <h2 className="text-xl mb-4">Create New Topic</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 h-32 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <div>
            <label htmlFor="start" className="block mb-1">
              Start:
            </label>
            <input
              type="text"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="destination" className="block mb-1">
              Destination:
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div>
          <VehicleInput updateVehicles={updateVehicles} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create Topic
        </button>
      </form>
    </div>
  );
}

export default NewTopic;
