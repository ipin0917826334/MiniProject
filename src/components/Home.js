// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function Home() {
//   const [topics, setTopics] = useState([]);

//   useEffect(() => {
//     async function fetchTopics() {
//       const response = await axios.get("https://api.example.com/topics");
//       setTopics(response.data);
//     }

//     fetchTopics();
//   }, []);

//   return (
//     <div className="home p-4">
//       <h2 className="text-xl mb-4">Topics</h2>
//       <ul className="list-disc list-inside">
//         {topics.map((topic) => (
//           <li key={topic.id}>
//             <Link to={`/topic/${topic.id}`} className="text-blue-500 hover:underline">
//               {topic.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
// import { mockTopics } from "../mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import useLikes from "../hooks/useLikes";
import useVote from "../hooks/useVote";

function TopicCard({ topic }) {
  const { likes, dislikes, handleLike, handleDislike } = useVote(topic.likes, topic.dislikes);
  console.log("TopicCard:", topic);
  return (
    <div className="topic-card bg-gray-100 p-4 mb-4 rounded shadow">
      <div className="flex flex-nowarp gap-2">
      <Link to={`/topic/${topic._id}`} className="text-blue-500 hover:text-blue-700">
        <h2 className="text-xl font-bold">
          {topic.title}
        </h2>
      </Link>
      <div className="mt-0.5">
      ({topic.commentCount} comments)
      </div>
      </div>
      <p className="text-gray-700">Description: {topic.description}</p>
      <div className="flex items-center mt-2">
        <button
          className="flex items-center bg-blue-500 text-white px-2 py-1 rounded mr-2"
          onClick={handleLike}
        >
          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
          Like ({likes})
        </button>
        <button
          className="flex items-center bg-red-500 text-white px-2 py-1 rounded"
          onClick={handleDislike}
        >
          <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
          Dislike ({dislikes})
        </button>
      </div>
      <div className="flex justify-end">
        <span className="text-gray-600">Created by {topic.author}</span>
      </div>
    </div>
  );
}

function Home({ userData }) {
  //  console.log("User Profile:", userData);
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await api.get("/topics");
        // console.log("ss"+response.data)
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);
  
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredTopics = topics.filter((topic) =>
    (topic.title + " " + topic.description).toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredTopics)
  return (
    <div className="home p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700">ไปไหนดี<span className="text-lg">  สังคมแห่งการปรึกษาด้านการเดินทาง</span></h1>
        {userData == null?(<div></div>):(
        <Link to="/new-topic" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Topic
        </Link>)}
      </div>
      <input
        type="text"
        placeholder="Search for topics..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={search}
        onChange={handleSearch}
      />
      {filteredTopics.map((topic) => {
        console.log("Rendering topic:", topic);
        return <TopicCard key={topic.id} topic={topic} />;
      })}
    </div>
  );
}

export default Home;
