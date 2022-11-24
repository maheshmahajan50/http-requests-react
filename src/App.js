import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moives, setMoives] = useState([]);

  async function fetchMoivesHandler() {
    const response = await fetch("https://swapi.dev/api/films/");
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={moives} />
      </section>
    </React.Fragment>
  );
}

export default App;
