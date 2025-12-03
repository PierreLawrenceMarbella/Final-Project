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
    { id: 7, name: 'Antipolo Evacuation Center', lat: 14.5786, lng: 121.1758, riskLevel: 'Low' },
    { id: 8, name: 'Rodriguez Community Shelter', lat: 14.7289, lng: 121.1158, riskLevel: 'Low' },
    { id: 9, name: 'Montalban Regional Hospital', lat: 14.7289, lng: 121.0820, riskLevel: 'Low' },
  ]);
  const [edges, setEdges] = useState([
    { from: 1, to: 2, label: '7.5km' },
    { from: 1, to: 3, label: '8.2km' },
    { from: 2, to: 4, label: '9.8km' },
    { from: 1, to: 5, label: '15.3km' },
    { from: 3, to: 6, label: '3.2km' },
    { from: 4, to: 6, label: '6.1km' },
    { from: 5, to: 4, label: '12.5km' },
    { from: 5, to: 7, label: '25.8km' },
    { from: 7, to: 8, label: '18.5km' },
    { from: 3, to: 9, label: '22.1km' },
    { from: 4, to: 9, label: '19.3km' },
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

  const getEvacuationStatus = (location) => {
    if (location.riskLevel === 'High') {
      return {
        status: 'EVACUATE IMMEDIATELY',
        color: '#ff4444',
        recommendation: 'This is a high-risk zone. Evacuate to a safe location now.'
      };
    }

    // Find nearby high-risk locations
    const connectedHighRisk = edges
      .filter(edge => (edge.from === location.id || edge.to === location.id))
      .map(edge => edge.from === location.id ? edge.to : edge.from)
      .some(id => locations.find(loc => loc.id === id && loc.riskLevel === 'High'));

    if (location.riskLevel === 'Moderate' && connectedHighRisk) {
      return {
        status: 'PREPARE TO EVACUATE',
        color: '#ffaa00',
        recommendation: 'Located near high-risk zones. Stay alert and prepare evacuation routes.'
      };
    }

    if (location.riskLevel === 'Moderate') {
      return {
        status: 'MONITOR SITUATION',
        color: '#ffaa00',
        recommendation: 'Moderate risk. Keep emergency supplies ready and monitor updates.'
      };
    }

    return {
      status: 'SAFE ZONE',
      color: '#44ff44',
      recommendation: 'Low risk area. May be used as shelter or evacuation destination.'
    };
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
                
                {(() => {
                  const evacStatus = getEvacuationStatus(selectedLocation);
                  return (
                    <div className="evacuation-advisory" style={{ borderLeftColor: evacStatus.color }}>
                      <p className="evacuation-status" style={{ color: evacStatus.color }}>
                        🚨 {evacStatus.status}
                      </p>
                      <p className="evacuation-rec">{evacStatus.recommendation}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="safe-areas-panel">
            <h3>✅ Safe Areas</h3>
            <div className="safe-areas-list">
              {locations
                .filter(loc => loc.riskLevel === 'Low')
                .map(loc => (
                  <div 
                    key={loc.id} 
                    className="safe-area-item"
                    onClick={() => setSelectedLocation(loc)}
                  >
                    <p><strong>{loc.name}</strong></p>
                    <p className="distance">Safe evacuation destination</p>
                  </div>
                ))}
            </div>
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
