import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moives, setMoives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoivesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong !");
      }

      const data = await response.json();

      let transformedData = data.results.map((moive) => {
        return {
          id: moive.episode_id,
          title: moive.title,
          openingText: moive.opening_crawl,
          releaseDate: moive.release_date,
        };
      });
      setMoives(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Not found any moives..</p>;

  if (moives.length > 0) {
    content = <MoviesList movies={moives} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading .........</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
