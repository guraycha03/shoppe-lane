// src/main.jsx


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const isGithubPages = import.meta.env.BASE_URL === '/shoppe-lane/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={isGithubPages ? '/shoppe-lane' : '/'}>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
