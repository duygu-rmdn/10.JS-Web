import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navigation from './components/Navigation';
import EventInfo from './components/EventInfo';
import NavigationPoints from './components/NavigationPoints';
import Speakers from './components/Speakers';
import Tickets from './components/Tickets';
import Schedule from './components/Schedule';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navigation />
    <EventInfo />
    <NavigationPoints />
    <Speakers />
    <Tickets />
    <Schedule />
    <Footer />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
