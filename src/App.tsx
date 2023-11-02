import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './components/ui/Router';
// import './App.css';

function App() {
  return (
    <div className="d-flex flex-column">
        <Header />
        <Router />
        <Footer />
    </div>
  );
}

export default App;