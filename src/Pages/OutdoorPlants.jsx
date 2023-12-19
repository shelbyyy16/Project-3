import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function OutdoorPlants({ searchQuery }) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${apiKey}&indoor=0&order=asc`
        );
        setPlants(response.data.data);
      } catch (error) {
        console.error("Error fetching plant", error);
      }
    }

    fetchPlants();
  }, []);

  const filteredPlants = plants
    .filter((plant) =>
      plant.common_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((plant, index, self) =>
      index === self.findIndex((p) => p.common_name === plant.common_name)
    );

  return (
    <>
      <h1>Outdoor Plant Library</h1>
      <section className="container">
        {filteredPlants &&
          filteredPlants
            .filter((plant) => plant.default_image && plant.default_image.regular_url)
            .map((plant) => (
              <Link to={`/details/${plant.id}`} key={plant.id} className="plant-link">
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
                      Cycle: {plant.cycle}<br /><br />
                      Watering: {plant.watering}<br /><br />
                      Sunlight: {plant.sunlight}<br /><br />
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
      </section>
    </>
  );
}

export default OutdoorPlants;