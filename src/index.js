
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Route from "react-router-dom"
import Home from './pages/Home';
import DataImport from './pages/DataImport';
import Players from './pages/Players';
import './index.scss';

// Define your component here
function App() {
    return (
        <Router> {/* Wrap the component with Router */}
            <Routes> {/* Wrap the routes with Routes */}
                <Route path="/" element={<Home />} /> {/* Define the route for Home component */}
                <Route path="/data-manager" element={<DataImport />} /> {/* Define the route for DataImport component */}
                <Route path="/players" element={<Players />} />
            </Routes>
        </Router>
    );
}

// Render the component to the DOM
createRoot(document.getElementById('root')).render(<App />);
