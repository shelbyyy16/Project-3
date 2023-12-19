import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Search({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${apiKey}&q=${searchQuery}`
        );

        const filteredResults = response.data.data.filter(
          (result) => 
            result.common_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            result.default_image && result.default_image.regular_url
        );

        const uniqueResults = Array.from(new Set(filteredResults.map((result) => result.common_name)))
          .map((commonName) => filteredResults.find((result) => result.common_name === commonName));

        setSearchResults(uniqueResults);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    }

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results</h1>
      <section className="container">
        {searchResults.map((result) => (
          <div key={result.id} className="search-result">
            <Link to={`/details/${result.id}`} className="plant-link" key={result.id}>
              <div className="card">
                <div className="plant-image">
                  {result.default_image && result.default_image.regular_url && (
                    <img
                      src={result.default_image.regular_url}
                      alt={result.common_name}
                    />
                  )}
                </div>
                <div className="content-container">
                  <span className="plant-title">{result.common_name}</span>
                  <ul>
                    Cycle: {result.cycle}
                    <br></br>
                    <br></br>
                    Watering: {result.watering}
                    <br></br>
                    <br></br>
                    Sunlight: {result.sunlight}
                    <br></br>
                    <br></br>
                  </ul>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Search;