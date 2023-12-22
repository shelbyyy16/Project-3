import React, { useState, useEffect,} from "react";
import "./PlantLibraries.css"
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
  const perPage = 12; 

  useEffect(() => {
    async function fetchPlants(page) {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${apiKey}&indoor=1&order=asc&page=${page}&per_page=${perPage}`
        );

        if (response.data && response.data.total) {
          setPlants((prevPlants) => [...prevPlants, ...response.data.data]);
          setTotalPages(Math.ceil(response.data.total / perPage));
        } else {
          console.error("Invalid API response", response.data);
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

  const visiblePlants = uniquePlants
    .filter((plant, index) => index < currentPage * perPage)
    .filter(
      (plant) => plant.default_image && plant.default_image.regular_url
    );

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h1>Indoor Plant Library</h1>
      <section className="container">
        {visiblePlants.map((plant) => (
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
      {currentPage < totalPages && (
        <div className="show-more-container">
          <button onClick={loadMore} className="show-more-button">
            Show More
          </button>
        </div>
      )}
    </>
  );
}

export default IndoorPlants;
