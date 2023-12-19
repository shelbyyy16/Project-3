import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/search?key=${apiKey}&q=${searchQuery}`
        );

        setSearchResults(response.data.data);
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    }

    if (searchQuery.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear results if the search query is empty
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Search Query: {searchQuery}</p>
      {searchResults && searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              {/* Display relevant information about the plant */}
              <h3>{result.common_name}</h3>
              <p>Scientific Name: {result.scientific_name}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Search;