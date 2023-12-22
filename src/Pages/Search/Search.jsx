import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function capitalizeWords(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function Search({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        let currentPage = 1;
        let allResults = [];

        while (true) {
          const response = await axios.get(
            `https://perenual.com/api/species-list?key=${apiKey}&q=${searchQuery}&page=${currentPage}`
          );

          const currentResults = response.data.data.filter(
            (result) =>
              result.common_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
              result.default_image &&
              result.default_image.regular_url
          );

          allResults = allResults.concat(currentResults);
          if (!response.data.meta || !response.data.meta.next) {
            break;
          }

          currentPage += 1;
        }

        const uniqueResults = Array.from(new Set(allResults.map((result) => result.common_name)))
          .map((commonName) => allResults.find((result) => result.common_name === commonName));

        setSearchResults(uniqueResults);
      } catch (error) {
        console.error('Error fetching search results', error);
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
                    <img src={result.default_image.regular_url} alt={result.common_name} />
                  )}
                </div>
                <div className="content-container">
                  <span className="plant-title">{capitalizeWords(result.common_name)}</span>
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