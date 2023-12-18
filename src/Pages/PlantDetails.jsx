import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PlantDetails() {
    const [plantDetails, setPlantDetails] = useState(null);
    const { id }= useParams

    useEffect(() => {
        async function fetchPlantDetails() {
            const plantId = match.params.id;

            try {
                const apiKey = process.env.API_KEY;
                const response = await axios.get(`https://perenual.com/api/plant-details/${plantId}?key=${apiKey}`);
                setPlantDetails(response.data);
            } catch (error) {
                console.error("Error fetching plant details:", error);
            }
        }
        
        fetchPlantDetails();
    }, [match.params.id]);

    return (
        <div>
            <h1>Plant Details</h1>
            {plantDetails && (
                <div>
                    <h2>{plantDetails.common_name}</h2>
                    <p>Scientific Name: {plantDetails.scientific_name[0]}</p>
                </div>
            )}
        </div>
    );
}

export default PlantDetails;