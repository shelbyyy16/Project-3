import React from 'react';
import {Routes,  Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Plants from './Pages/Plants';
import PlantDetails from './Pages/PlantDetails';
import MyGarden from './Pages/MyGarden';


function App() {


  return (
    <>
    <Header />
      <h1>Petals & Pots</h1>
    <main>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/plants" element={<Plants />} />
      <Route path ="/details/:id" element={ <PlantDetails />} />
      <Route path="/garden" element={ <MyGarden />} />
      </Routes>
      <Footer />
    </main>
    </>
  )
}

export default App