import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Plants() {
    const [plants, setPlants] = useState(null);

    useEffect(() => {
        async function fetchPlants() {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const response = await axios.get(`https://perenual.com/api/species-list?key=${apiKey}`);
                setPlants(response.data);
            } catch (error) {
                console.error("Error fetching plant", error);
            }
        }

        fetchPlants();
    }, []);

    return (
        <>
            <h1>Plant Library</h1>
            <section className="container">
                {plants &&
                    plants.data.map((plant) => (
                        <Link to={`/details/${plant._id}`} key={plant.id}>
                            <div className="card">
                                <div className="plant-image">
                                    <img src={plant.default_image.regular_url} alt={plant.common_name} />
                                </div>
                                <h2>{plant.common_name}</h2>
                                <p>{plant.scientific_name[0]}</p>
                            </div>
                        </Link>
                    ))}
            </section>
        </>
    );
}

export default Plants;