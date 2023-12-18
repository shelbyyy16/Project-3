import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Plants() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchPlants() {
            try {
                const apiKey = rocess.env.API_KEY;
                const response = await axios.get(`https://perenual.com/api/species-list?key=${apiKey}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchPlants();
    }, []);

  return (
    <section className="container">
      <h1>API Data</h1>
      {data && data.data.map((plant) => (
          <Link to={`/details/${plant._id}`} key={plant.id}>
            <div className="card">
              <div className="plant-image">
                <img src={plant.default_image.regular_url} />
              </div>
              <h2>{plant.common_name}</h2>
              <p>{plant.scientific_name[0]}</p>
            </div>
          </Link>
        ))}
    </section>
  );
}

export default Plants;
