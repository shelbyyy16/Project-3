import React from 'react';
import {Routes,  Route } from 'react-router-dom'
import './App.css'
import Header from '../Header';
import Footer from '../Footer';
import Home from '../../Pages/Home';
import IndoorPlants from '../../Pages/IndoorPlants';
import OutdoorPlants from '../../Pages/OutdoorPlants';
import PlantDetails from '../../Pages/PlantDetails';
import MyGarden from '../../Pages/MyGarden';
import Profile from '../../Pages/Profile';


function App() {


  return (
    <>
    <Header />
    <main>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="indoorplants/*" element={<IndoorPlants />} />
      <Route path="outdoorplants/*" element={<OutdoorPlants />} />
      <Route path="/details/:id" element={<PlantDetails />} />
      <Route path="/garden" element={ <MyGarden />} />
      <Route path="/profile" element={ <Profile />} />
      </Routes>
      <Footer />
    </main>
    </>
  )
}

export default App
