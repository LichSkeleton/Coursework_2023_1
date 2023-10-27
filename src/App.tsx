import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
// import './App.css';

function App() {
  return (
    <div className="d-flex flex-column">
      <Header />

      <Footer />
    </div>
  );
}

export default App;
