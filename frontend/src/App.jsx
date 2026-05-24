import React, { useState } from 'react';
import './index.css';
import ClaimForm from './components/ClaimForm';
import PredictionResult from './components/PredictionResult';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = (result) => {
    setPrediction(result);
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>ClaimShield Fraud Defense</h1>
        <div className="status-indicator">
          <span className="pulse"></span>
          System Operational
        </div>
      </header>
      
      <main className="dashboard-content">
        <section className="analysis-section">
          <div className="glass-card">
            <header className="card-header">
              <h2>New Claim Analysis</h2>
              <p>Enter claim details to run predictive fraud modeling.</p>
            </header>
            <ClaimForm onResult={handlePrediction} setLoading={setLoading} />
          </div>
        </section>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Analyzing features against ML model...</p>
          </div>
        )}

        {prediction && (
          <section className="results-section">
            <PredictionResult data={prediction} />
          </section>
        )}
      </main>
      
      <footer className="main-footer">
        <p>&copy; 2024 ClaimShield Healthcare Systems. All systems operational.</p>
      </footer>
    </div>
  );
}

export default App;
