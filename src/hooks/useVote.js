import { useState } from "react";

const useVote = (initialLikes, initialDislikes) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [vote, setVote] = useState(null);

  const handleLike = () => {
    if (vote === "like") {
      setLikes(likes - 1);
      setVote(null);
    } else {
      setLikes(likes + 1);
      if (vote === "dislike") {
        setDislikes(dislikes - 1);
      }
      setVote("like");
    }
  };

  const handleDislike = () => {
    if (vote === "dislike") {
      setDislikes(dislikes - 1);
      setVote(null);
    } else {
      setDislikes(dislikes + 1);
      if (vote === "like") {
        setLikes(likes - 1);
      }
      setVote("dislike");
    }
  };

  return { likes, dislikes, handleLike, handleDislike };
};

export default useVote;
