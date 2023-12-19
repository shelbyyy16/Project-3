import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Petals & Pots</h1>
      <div className="browse-button-container">
      <Link to="/indoorplants">
        <button className="browse-button">Browse Indoor Plants</button>
      </Link>
      <br></br><br></br>
      <Link to="/outdoorplants">
        <button className="browse-button">Browse Outdoor Plants</button>
      </Link>
      </div>
    </div>
  );
}

export default Home;
