import { useState, useEffect } from "react";
import api from "../services/api";

const useVote = (initialLikes, initialDislikes, initialVote, commentId) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [vote, setVote] = useState(initialVote);

  const userData = JSON.parse(localStorage.getItem('userData'));

  async function handleLike() {
    if (userData) {
      let newLikes = likes;
      if (vote === "like") {
        newLikes--;
        setVote(null);
      } else {
        newLikes++;
        if (vote === "dislike") {
          setDislikes(dislikes - 1);
        }
        setVote("like");
      }
      setLikes(newLikes);

      try {
        const response = await api.put(`/topics/comments/${commentId}`, { action: "like", userId: userData._id });
        const updatedComment = response.data; // Assuming your backend returns the updated comment data
        setLikes(updatedComment.likes); // Update the local state with the new likes count from the backend
    } catch (error) {
        console.error("Error updating likes:", error);
    }
    }
  }

  async function handleDislike() {
    if (userData) {
      let newDislikes = dislikes;
      if (vote === "dislike") {
        newDislikes--;
        setVote(null);
      } else {
        newDislikes++;
        if (vote === "like") {
          setLikes(likes - 1);
        }
        setVote("dislike");
      }
      setDislikes(newDislikes);
      console.log("vote:", vote);
      console.log("likes:", likes);
      console.log("dislikes:", dislikes);
      try {
        const response = await api.put(`/topics/comments/${commentId}`, { action: "dislike", userId: userData._id });
        const updatedComment = response.data; // Assuming your backend returns the updated comment data
        setDislikes(updatedComment.dislikes); // Update the local state with the new likes count from the backend
    } catch (error) {
      console.error("Error updating likes:", error);
      }
    }
  }

  return { likes, dislikes, handleLike, handleDislike };
};

export default useVote;
