import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function OutdoorPlants() {
    const [plants, setPlants] = useState();

    useEffect(() => {
        async function fetchPlants() {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const response = await axios.get(`https://perenual.com/api/species-list?key=${apiKey}&indoor=0&order=asc`);
                setPlants(response.data);
            } catch (error) {
                console.error("Error fetching plant", error);
            }
        }

        fetchPlants();
    }, []);

    return (
        <>
            <h1>Outdoor Plant Library</h1>
            <section className="container">
                {plants &&
                    plants.data
                        .filter((plant) => plant.default_image && plant.default_image.regular_url)
                        .map((plant) => (
                            <Link to={`/details/${plant.id}`} key={plant.id} className="plant-link">
                                <div className="card">
                                    <div className="plant-image">
                                        <img src={plant.default_image.regular_url} alt={plant.common_name} />
                                    </div>
                                    <h2>{plant.common_name}</h2>
                                </div>
                            </Link>
                        ))}
            </section>
        </>
    );
}

export default OutdoorPlants;