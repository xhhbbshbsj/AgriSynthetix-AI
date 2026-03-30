import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchField from './SearchField';

// Fix for default marker icon issues in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function App() {
  const [position, setPosition] = useState([23.47, 88.55]); // Default: Nadia, WB
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Component to handle map clicks
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return <Marker position={position}></Marker>;
  }

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/get-prediction', {
        lat: position[0],
        lon: position[1]
      });
      setPrediction(res.data);
    } catch (err) {
      alert("Error connecting to server!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>CropIntel AI: Pedo-Climatic Predictor</h1>
      <p>Click on the map to select your farm location:</p>
      
      <div style={{ height: '400px', width: '100%', marginBottom: '20px' }}>
        <MapContainer center={position} zoom={8} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <SearchField />
          <LocationMarker />
        </MapContainer>
      </div>

      <button 
        onClick={handlePredict} 
        disabled={loading}
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {loading ? "Analyzing Data..." : "Analyze Yield Potential"}
      </button>

      {prediction && (
  <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
    <h3 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>
      Analysis for ({prediction.location?.lat.toFixed(2)}, {prediction.location?.lon.toFixed(2)})
    </h3>
    
    {/* Best Crop Highlight Box */}
    {prediction.top_recommendation && (
      <div style={{ backgroundColor: '#d4edda', border: '1px solid #c3e6cb', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ margin: '0', color: '#155724' }}>
          🏆 Best Recommended Crop: {prediction.top_recommendation.name}
        </h2>
        <p style={{ fontSize: '1.1rem', margin: '10px 0' }}>
          Potential Yield: <strong>{prediction.top_recommendation.yield} tons/ha</strong>
        </p>
      </div>
    )}

    {/* Pedo-Climatic Stats with Safety Checks */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px' }}>
      <p><strong>🌡️ Avg. Temp:</strong> {typeof prediction.weather?.temp === 'number' ? prediction.weather.temp.toFixed(2) : '--'}°C</p>
      <p><strong>💧 Rainfall:</strong> {prediction.weather?.rain_proxy || '--'} mm</p>
      <p><strong>🧪 Nitrogen:</strong> {prediction.soil_profile?.nitrogen || '--'} mg/kg</p>
      <p><strong>📈 Market Trend:</strong> {prediction.market_intelligence?.trend || 'Stable'}</p>
    </div>

    <p style={{ fontSize: '0.8rem', color: prediction.data_source === 'Live API Data' ? 'green' : 'orange' }}>
      📡 Data Source: {prediction.data_source || 'Live Satellite Feed'}
    </p>

    {/* Alternative Crops Table */}
    {prediction.all_options && (
      <div style={{ marginTop: '20px' }}>
        <h4>Alternative Crop Comparison:</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Crop</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Est. Yield</th>
            </tr>
          </thead>
          <tbody>
            {prediction.all_options.map((crop, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{crop.name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{crop.yield} t/ha</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}
    </div>
  );
}

export default App;