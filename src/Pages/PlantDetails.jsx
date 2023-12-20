import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function formatCommonName(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function PlantDetails() {
  const { id } = useParams();
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlantDetails() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://perenual.com/api/species/details/${id}?key=${apiKey}`,
          `https://perenual.com/api/species-care-guide-list?key=${apiKey}&species_id=${id}`
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
            <div className="details-plant-image">
              {plantDetails.default_image && (
                <img
                  src={plantDetails.default_image.regular_url}
                  alt={plantDetails.common_name}
                />
              )}
            </div>
            <div className="details-content-container">
              <span className="plant-title">
                {formatCommonName(plantDetails.common_name) || "Common Name not available"}
              </span> <br></br>
              {plantDetails.scientific_name && (
                <span className="scientific-name">
                  {formatCommonName(plantDetails.scientific_name[0])}
                </span>
              )}
              <ul>
                <li><span>Indoor Plant:</span> {plantDetails.indoor ? "Yes" : "No"}</li>
                <li><span>Watering Needs:</span> {plantDetails.watering}</li>
                <li><span>Sunlight Needs:</span> {plantDetails.sunlight && plantDetails.sunlight.join(", ")}</li>
                <li><span>Toxic to humans:</span> {plantDetails.poisonous_to_humans ? "Yes" : "No"}</li>
                <li><span>Toxic to pets:</span> {plantDetails.poisonous_to_pets ? "Yes" : "No"}</li>
                <li><span>Care Level:</span> {plantDetails.care_level}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;