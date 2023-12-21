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
  const [plantsPerPage] = useState(8);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${apiKey}&indoor=1&order=asc`
        );
        setPlants(response.data.data);
      } catch (error) {
        console.error("Error fetching plant", error);
      }
    }

    fetchPlants();
  }, []);

  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);

  const uniquePlants = Array.from(
    new Set(currentPlants.map((plant) => plant.common_name))
  ).map((commonName) =>
    currentPlants.find((plant) => plant.common_name === commonName)
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log("Total plants:", plants.length);
  return (
    <>
      <h1>Indoor Plant Library</h1>
      <section className="container">
        {currentPlants &&
          currentPlants
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
        {Array.from({ length: Math.ceil(plants.length / plantsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  );
}

export default IndoorPlants

