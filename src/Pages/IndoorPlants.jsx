import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IndoorPlants() {
  const [plants, setPlants] = useState([]);

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


  const uniquePlants = Array.from(new Set(plants.map(plant => plant.common_name)))
    .map(commonName => plants.find(plant => plant.common_name === commonName));

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
                  <span className="plant-title">{plant.common_name}</span>
                  <ul>
                    Cycle: {plant.cycle}<br></br><br></br>
                    Watering: {plant.watering}<br></br><br></br>
                    Sunlight: {plant.sunlight}<br></br><br></br>
                  </ul>
                  </div>
                </div>
              </Link>
            ))}
      </section>
    </>
  );
}

export default IndoorPlants;
