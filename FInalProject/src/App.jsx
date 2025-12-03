import React, { useState, useEffect } from 'react';
import Network from './components/Network';
import DisasterForm from './components/DisasterForm';
import './App.css';

function App() {
  const [locations, setLocations] = useState([
    { id: 1, name: 'Metro Manila Central', lat: 14.5995, lng: 120.9842, riskLevel: 'High' },
    { id: 2, name: 'Makati CBD', lat: 14.5549, lng: 121.0193, riskLevel: 'High' },
    { id: 3, name: 'Quezon City', lat: 14.6349, lng: 121.0388, riskLevel: 'Moderate' },
    { id: 4, name: 'Pasig General Hospital', lat: 14.5769, lng: 121.0852, riskLevel: 'Moderate' },
    { id: 5, name: 'Cainta Fault Zone', lat: 14.5789, lng: 121.1945, riskLevel: 'High' },
    { id: 6, name: 'Marikina Business District', lat: 14.6396, lng: 121.0900, riskLevel: 'Moderate' },
  ]);
  const [edges, setEdges] = useState([
    { from: 1, to: 2, label: '7.5km' },
    { from: 1, to: 3, label: '8.2km' },
    { from: 2, to: 4, label: '9.8km' },
    { from: 1, to: 5, label: '15.3km' },
    { from: 3, to: 6, label: '3.2km' },
    { from: 4, to: 6, label: '6.1km' },
    { from: 5, to: 4, label: '12.5km' },
  ]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const addLocation = (name, lat, lng, riskLevel) => {
    const id = locations.length + 1;
    const newLocation = { id, name, lat, lng, riskLevel };
    setLocations([...locations, newLocation]);
  };

  const addConnection = (fromId, toId, distance) => {
    const newEdge = { from: fromId, to: toId, label: `${distance}km` };
    setEdges([...edges, newEdge]);
  };

  const calculateShortestPath = (startId, endId) => {
    // Simple BFS implementation for shortest path
    const graph = {};
    locations.forEach(loc => {
      graph[loc.id] = [];
    });
    edges.forEach(edge => {
      graph[edge.from].push(edge.to);
      graph[edge.to].push(edge.from);
    });

    const queue = [[startId, [startId]]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const [current, path] = queue.shift();
      if (current === endId) {
        return path;
      }
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    return null;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🌍 EarthSafe GIS Analyzer</h1>
        <p>Disaster Management with Graph-Based Risk Analysis</p>
      </header>

      <div className="container">
        <aside className="sidebar">
          <DisasterForm 
            onAddLocation={addLocation}
            onAddConnection={addConnection}
            locations={locations}
          />
          
          <div className="info-panel">
            <h3>Network Information</h3>
            <p>Locations: <strong>{locations.length}</strong></p>
            <p>Connections: <strong>{edges.length}</strong></p>
            
            {selectedLocation && (
              <div className="location-details">
                <h4>{selectedLocation.name}</h4>
                <p>Lat: {selectedLocation.lat.toFixed(2)}</p>
                <p>Lng: {selectedLocation.lng.toFixed(2)}</p>
                <p>Risk Level: <span className={`risk-${selectedLocation.riskLevel.toLowerCase()}`}>{selectedLocation.riskLevel}</span></p>
              </div>
            )}
          </div>
        </aside>

        <main className="main-content">
          <Network 
            locations={locations}
            edges={edges}
            onSelectLocation={setSelectedLocation}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
