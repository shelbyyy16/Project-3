import React, { useEffect, useState } from "react";
import "./Footer.css"
import axios from "axios";
import { Link } from "react-router-dom"; 

function Footer() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${apiKey}`
        );
        setPlants(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plants", error);
        setLoading(false);
      }
    }

    fetchPlants();
  }, []);

  const getRandomPlants = () => {
    const shuffledPlants = plants.sort(() => 0.5 - Math.random());
    return shuffledPlants.slice(0, 4);
  };

  const randomPlants = getRandomPlants();

  return (
    <>
    <div className="spacer"></div>
      <div className="random-plants">
        <h3>Get Some Plant-spiration</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="random-plants-container">
            {randomPlants.map((plant) => (
              <div className="plant-container" key={plant.id}>
                <Link to={`/details/${plant.id}`} className="plant-link">
                  <img
                    src={plant.default_image.thumbnail}
                    alt={plant.common_name}
                  />
                  <button>{plant.common_name}</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="spacer"></div>
      <div className="footer">Designed & Built by Shelby Pagan 2023</div>
    </>
  );
}

export default Footer;