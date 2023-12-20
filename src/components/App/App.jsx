import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../../index.css";
import Header from "../Header";
import Footer from "../Footer";
import Home from "../../Pages/Home";
import IndoorPlants from "../../Pages/IndoorPlants";
import OutdoorPlants from "../../Pages/OutdoorPlants";
import PlantDetails from "../../Pages/PlantDetails";

import Profile from "../../Pages/Profile";
import Search from "../../Pages/Search";
import FAQ from "../../Pages/FAQ";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="indoorplants/*"
            element={<IndoorPlants searchQuery={searchQuery} />}
          />
          <Route
            path="outdoorplants/*"
            element={<OutdoorPlants searchQuery={searchQuery} />}
          />
          <Route path="/details/:id" element={<PlantDetails />} />

          <Route path="/profile" element={<Profile />} />
          <Route
            path="/search"
            element={<Search searchQuery={searchQuery} />}
          />
          <Route path="FAQ" element={<FAQ />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
