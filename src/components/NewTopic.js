import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewTopic } from "../mockData";

function NewTopic({ topics, setTopics, userData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [name, setName] = useState(userData.name);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("User Profile:", userData.name);
    const newTopic = {
      title,
      description,
      likes,
      dislikes,
      posts: [],
      name,
    };
    const addedTopic = addNewTopic(newTopic);
    setTopics((prevTopics) => [...prevTopics, addedTopic]);
    navigate(`/topic/${addedTopic.id}`);
  }
  
  return (
    <div className="new-topic p-4">
      <h2 className="text-xl mb-4">Create New Topic</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title:</label>
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
          <label htmlFor="description" className="block mb-1">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 h-32 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create Topic</button>
      </form>
    </div>
  );
}

export default NewTopic;
