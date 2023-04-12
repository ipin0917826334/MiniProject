import React from "react";
import useVote from "../hooks/useVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ comment }) => {
  const { likes, dislikes, handleLike, handleDislike } = useVote(comment.likes, comment.dislikes);
  console.log(comment)

  return (
    <div className="comment bg-gray-100 p-4 my-4 rounded shadow">
      <p className="text-gray-700 mb-4">{comment.content}</p>
      <div className="flex items-center">
        <button
          className="flex items-center bg-blue-500 text-white px-2 py-1 rounded mr-2"
          onClick={handleLike}
          disabled={handleLike.disabled}
        >
          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
          Like ({likes})
        </button>
        <button
          className="flex items-center bg-red-500 text-white px-2 py-1 rounded"
          onClick={handleDislike}
          disabled={handleDislike.disabled}
        >
          <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
          Dislike ({dislikes})
        </button>
      </div>
    </div>
  );
};

export default Comment;