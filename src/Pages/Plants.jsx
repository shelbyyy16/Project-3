import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Plants() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://perenual.com/api/species-list?key=sk-dYCf657f152c83b433491`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
        fetchData();
    }, []);

    return (
        <div>
            <h1>Plant Library</h1>
            {data && data.data.map((plant) => (
                <div key={plant.id}>
                    <h2>{plant.common_name}</h2>
                    <p>Scientific Name: {plant.scientific_name[0]}</p>
                </div>
            ))}
        </div>
    );
}

export default Plants;
