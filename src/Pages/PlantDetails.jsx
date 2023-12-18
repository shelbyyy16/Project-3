import React, { useState, useEffect } from "react";
import axios from "axios";

function PlantDetails({ match }) {
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlantDetails() {
      const plantId = match.params.id;

      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/plant-details/${plantId}?key=${apiKey}`
        );
        setPlantDetails(response.data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
        setError(
          "An error occurred while fetching plant details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPlantDetails();
  }, [match.params.id]);

  return (
    <div>
      <h1>Plant Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {plantDetails && (
        <div className="details-container">
          <div className="details-card">
            <div className="details-image">
              <img src={plantDetails.default_image.regular_url} alt={plantDetails.common_name} />
            </div>
            <h2>{plantDetails.common_name}</h2>
            <p>Scientific Name: {plantDetails.scientific_name[0]}</p>
            <p>Indoor Plant: {plantDetails.indoor ? "Yes" : "No"}</p>
            <p>Watering Needs: {plantDetails.watering}</p>
            <p>Sunlight Needs: {plantDetails.sunlight.join(", ")}</p>
            <p>Toxic to humans: {plantDetails.poisonous_to_humans ? "Yes" : "No"}</p>
            <p>Toxic to pets: {plantDetails.poisonous_to_pets ? "Yes" : "No"}</p>
            <p>Care Level: {plantDetails.care_level}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;