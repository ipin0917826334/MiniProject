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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mockTopics } from "../mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import useLikes from "../hooks/useLikes";
import useVote from "../hooks/useVote";

function TopicCard({ topic }) {
  const { likes, dislikes, handleLike, handleDislike } = useVote(topic.likes, topic.dislikes);

  return (
    <div className="topic-card bg-gray-100 p-4 mb-4 rounded shadow">
    <Link to={`/topic/${topic.id}`} className="text-blue-500 hover:text-blue-700">
        <h2 className="text-xl font-bold">
          {topic.title}{' '}
          <span className="text-gray-600">({topic.commentCount} comments)</span>
        </h2>
      </Link>
      <p className="text-gray-700">{topic.description}</p>
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
    </div>
  );
}

function Home({ topics, userProfile }) {
  console.log("User Profile:", userProfile);
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredTopics = topics.filter((topic) =>
    (topic.title + " " + topic.description).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Forum</h1>
        <Link to="/new-topic" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Topic
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search for topics..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={search}
        onChange={handleSearch}
      />
       {filteredTopics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}

export default Home;
