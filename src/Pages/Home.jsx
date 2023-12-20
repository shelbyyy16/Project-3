import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home-page-container">
        <div className="home-page-image">
          <img src="/images/LandingPage.png" alt="Home Image" />
        </div>
        <div className="content-container">
          <h1>Gardening: where every day is Earth Day.</h1>
          <div className="browse-button-container">
            <Link to="/indoorplants">
              <button className="browse-button">Browse Indoor Plants</button>
            </Link>
            <Link to="/outdoorplants">
              <button className="browse-button">Browse Outdoor Plants</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-suggestions-container">
        <Link to="/details/2193">
          <div>
            <img src="/images/jade.png" alt="Pothos" />
            <button className="browse-button">Jade Plant</button>
          </div>
        </Link>
        <Link to="/details/1846">
          <div>
            <img src="/images/spider.png" alt="Spider Plant" />
            <button className="browse-button">Spider Plant</button>
          </div>
        </Link>
        <Link to="/details/2774">
          <div>
            <img src="/images/pothos.png" alt="Pothos" />
            <button className="browse-button">Pothos Plant</button>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
