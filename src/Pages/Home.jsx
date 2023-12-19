import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page-container">
      <div className="home-page-image">
        <img src="/images/LandingPage.png" alt="Home Image" />
      </div>
      <div className="browse-button-container">
      <Link to="/indoorplants">
        <button className="browse-button">Browse Indoor Plants</button>
      </Link>
      <Link to="/outdoorplants">
        <button className="browse-button">Browse Outdoor Plants</button>
      </Link>
      </div>
    </div>
  );
}

export default Home;
