import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function formatCommonName(commonName) {
  return commonName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function IndoorPlants() {
  const [plants, setPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12; // Set the desired number of plants per page

  useEffect(() => {
    async function fetchPlants(page) {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${apiKey}&indoor=1&order=asc&page=${page}&per_page=${perPage}`
        );
    
        if (response.data && response.data.total) {
          setPlants(response.data.data);
          setTotalPages(Math.ceil(response.data.total / perPage));
        } else {
          console.error("Invalid API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching plant", error);
      }
    }
    
    fetchPlants(currentPage);
  }, [currentPage, perPage]);

  const uniquePlants = Array.from(
    new Set(plants.map((plant) => plant.common_name))
  ).map((commonName) =>
    plants.find((plant) => plant.common_name === commonName)
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Indoor Plant Library</h1>
      <section className="container">
        {uniquePlants &&
          uniquePlants
            .filter(
              (plant) => plant.default_image && plant.default_image.regular_url
            )
            .map((plant) => (
              <Link
                to={`/details/${plant.id}`}
                key={plant.id}
                className="plant-link"
              >
                <div className="card">
                  <div className="plant-image">
                    <img
                      src={plant.default_image.regular_url}
                      alt={plant.common_name}
                    />
                  </div>
                  <div className="content-container">
                    <span className="plant-title">
                      {formatCommonName(plant.common_name)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </section>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default IndoorPlants;