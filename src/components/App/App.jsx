import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../../Pages/Home';
import IndoorPlants from '../../Pages/IndoorPlants';
import OutdoorPlants from '../../Pages/OutdoorPlants';
import PlantDetails from '../../Pages/PlantDetails';
import MyGarden from '../../Pages/MyGarden';
import Profile from '../../Pages/Profile';
import Search from '../../Pages/Search';


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="indoorplants/*" element={<IndoorPlants searchQuery={searchQuery} />} />
          <Route path="outdoorplants/*" element={<OutdoorPlants searchQuery={searchQuery} />} />
          <Route path="/details/:id" element={<PlantDetails />} />
          <Route path="/garden" element={<MyGarden />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;