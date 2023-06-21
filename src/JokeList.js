import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = ({ numJokesToGet = 10 }) => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    if (jokes.length === 0) {
      getJokes();
    }
  }, [jokes]);

  const getJokes = async () => {
    try {
      const seenJokes = new Set(jokes.map(joke => joke.id));
      const newJokes = [];
      while (newJokes.length < numJokesToGet) {
        const res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        const { id, joke } = res.data;
        if (!seenJokes.has(id)) {
          seenJokes.add(id);
          newJokes.push({ id, text: joke, votes: 0 });
        } else {
          console.error("Duplicate joke found!");
        }
      }
      setJokes(newJokes);
    } catch (error) {
      console.log(error);
    }
  };

  const generateNewJokes = () => {
    setJokes([]);
  };

  const vote = (id, delta) => {
    setJokes(jokes =>
      jokes.map(joke => (joke.id === id ? { ...joke, votes: joke.votes + delta } : joke))
    );
  };

  if (jokes.length) {
    const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={generateNewJokes}>
          Get New Jokes
        </button>
        {sortedJokes.map(joke => (
          <Joke {...joke} key={joke.id} vote={vote} />
        ))}
      </div>
    );
  }

  return null;
};

export default JokeList;