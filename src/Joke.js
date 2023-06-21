import React from "react";
import "./Joke.css";

const Joke = ({ vote, votes, text, id }) => {
  const handleVote = (value) => () => vote(id, value);

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={handleVote(1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={handleVote(-1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;
