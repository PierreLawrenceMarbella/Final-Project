import React, { useState } from 'react';

const DisasterForm = ({ onAddLocation, onAddConnection, locations }) => {
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [riskLevel, setRiskLevel] = useState('Moderate');
  
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [distance, setDistance] = useState('');

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (locationName && latitude && longitude) {
      onAddLocation(
        locationName,
        parseFloat(latitude),
        parseFloat(longitude),
        riskLevel
      );
      setLocationName('');
      setLatitude('');
      setLongitude('');
      setRiskLevel('Moderate');
    }
  };

  const handleAddConnection = (e) => {
    e.preventDefault();
    if (fromId && toId && distance) {
      onAddConnection(parseInt(fromId), parseInt(toId), parseFloat(distance));
      setFromId('');
      setToId('');
      setDistance('');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Disaster Data</h2>

      {/* Location Form */}
      <form onSubmit={handleAddLocation} className="form-section">
        <h3>Add Location</h3>
        <input
          type="text"
          placeholder="Location name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Latitude"
          step="0.0001"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          step="0.0001"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
        <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>
        <button type="submit">Add Location</button>
      </form>

      {/* Connection Form */}
      {locations.length > 1 && (
        <form onSubmit={handleAddConnection} className="form-section">
          <h3>Add Connection</h3>
          <select value={fromId} onChange={(e) => setFromId(e.target.value)} required>
            <option value="">From Location</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>
                {loc.name} (ID: {loc.id})
              </option>
            ))}
          </select>
          <select value={toId} onChange={(e) => setToId(e.target.value)} required>
            <option value="">To Location</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>
                {loc.name} (ID: {loc.id})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Distance (km)"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
          <button type="submit">Add Connection</button>
        </form>
      )}
    </div>
  );
};

export default DisasterForm;
