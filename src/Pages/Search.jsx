import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${apiKey}&=${searchQuery}`
        );
  
        console.log('API Response:', response.data); // Log the response data
  
        setSearchResults(response.data.data);
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    }
  
    // Fetch data when the search query changes
    if (searchQuery) {
      fetchSearchResults();
    } else {
      // Reset search results when searchQuery is empty
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results</h1>
      {/* Display search results here */}
      {searchResults.map((result) => (
        <div key={result.id}>
            <h1>{result.common_name}</h1>
            </div>
      ))}
    </div>
  );
}

export default Search;