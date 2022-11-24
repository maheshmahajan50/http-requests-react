import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moives, setMoives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoivesHandler() {
    setIsLoading(true);
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
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={moives} />}
        {!isLoading && moives.length === 0 && <p>Not Found any moives ..</p>}
        {isLoading && <p>Loading .........</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
