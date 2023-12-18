import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PlantDetails() {
  const { id } = useParams();
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlantDetails() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species/details/${id}?key=${apiKey}`
        );
        setPlantDetails(response.data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlantDetails();
  }, [id]);

  return (
    <div>
      <h1>Plant Details</h1>
      {loading && <p>Loading...</p>}
      {plantDetails && (
        <div className="details-container">
          <div className="details-card">
            <div className="details-image">
              {plantDetails.default_image && (
                <img
                  src={plantDetails.default_image.regular_url}
                  alt={plantDetails.common_name}
                />
              )}
            </div>
            <h2>{plantDetails.common_name || "Common Name not available"}</h2>
            <p>
              Scientific Name:{" "}
              {plantDetails.scientific_name &&
                plantDetails.scientific_name[0]}
            </p>
            <p>Indoor Plant: {plantDetails.indoor ? "Yes" : "No"}</p>
            <p>Watering Needs: {plantDetails.watering}</p>
            <p>
              Sunlight Needs:{" "}
              {plantDetails.sunlight && plantDetails.sunlight.join(", ")}
            </p>
            <p>
              Toxic to humans: {plantDetails.poisonous_to_humans ? "Yes" : "No"}
            </p>
            <p>
              Toxic to pets: {plantDetails.poisonous_to_pets ? "Yes" : "No"}
            </p>
            <p>Care Level: {plantDetails.care_level}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;