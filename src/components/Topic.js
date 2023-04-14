// // This is a skeleton implementation of the Topic component. You'll need to modify it based on your backend API.
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function Topic() {
//   const { id } = useParams();
//   const [topic, setTopic] = useState(null);

//   useEffect(() => {
//     async function fetchTopic() {
//       const response = await axios.get(`https://api.example.com/topic/${id}`);
//       setTopic(response.data);
//     }

//     fetchTopic();
//   }, [id]);

//   if (!topic) return <div>Loading...</div>;

//   return (
//     <div className="topic p-4">
//       <h2 className="text-xl mb-4">{topic.title}</h2>
//       {topic.posts.map((post) => (
//         <div key={post.id} className="post bg-gray-100 p-4 my-4 rounded">
//           <h3 className="text-lg mb-2">{post.title}</h3>
//           <p>{post.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Topic;
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { mockTopics } from "../mockData";
import Comment from "./Comment";
import RouteInfo from './RouteInfo';

Modal.setAppElement("#root");
    
function Topic({ userData }) {
  const { id } = useParams();
  const topic = mockTopics.find((topic) => topic.id.toString() === id);
  const [comment, setComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [start, setStart] = useState("บ้านกูเอง");
  const [end, setEnd] = useState("โชว์ปิงปอง");
  const [name, setName] = useState(userData.name);
  const [imgProfile, setimgProfile] = useState(userData.imageUrl);
  if (!topic) {
    return <div>Topic not found</div>;
  }
  function handleCreateComment() {
    const newPost = {
      id: Math.max(...topic.posts.map((p) => p.id)) + 1,
      title: "New Comment",
      content: comment,
      likes: 0,
      dislikes: 0,
      author: name,
      imgProfile: imgProfile
    };
    topic.posts.push(newPost);
    setComment("");
    setModalIsOpen(false);
  }
  return (
    <div className="topic p-4">
        <RouteInfo start={start} end={end} />
      <h1 className="text-2xl font-bold mb-4">{topic.title} By {topic.name}</h1>
      <p className="text-gray-700 mb-4">{topic.description}</p>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setModalIsOpen(true)}
      >
        Add Comment
      </button>

      {topic.posts.map((post) => (
        <Comment key={post.id} comment={post}/>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Comment Modal"
        className="modal-dialog w-2/5 mx-auto mt-20 p-4 border rounded shadow-lg bg-white"
      >
        <h2 className="text-xl font-bold mb-4">Add Comment</h2>
        <form>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="5"
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleCreateComment}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Topic;