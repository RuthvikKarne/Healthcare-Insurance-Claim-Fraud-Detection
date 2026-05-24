import React from 'react';

const PredictionResult = ({ data }) => {
  const { is_fraudulent, fraud_probability } = data;
  const percentage = (fraud_probability * 100).toFixed(1);

  return (
    <div className="prediction-container">
      <div className={`result-card ${is_fraudulent ? 'fraud-alert' : 'legit-success'}`}>
        <div className="icon">
          {is_fraudulent ? '⚠️' : '✅'}
        </div>
        <div className="content">
          <h3>{is_fraudulent ? 'High Risk Detected' : 'Claim Appears Legitimate'}</h3>
          <p>
            {is_fraudulent 
              ? 'This claim has been flagged by the ML model for immediate review.' 
              : 'Our analysis indicates a low probability of fraudulent activity.'}
          </p>
        </div>
      </div>

      <div className="probability-card glass-card">
        <div className="card-header">
          <h4>Fraud Probability Score</h4>
          <span className="score-value">{percentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${percentage}%`,
              background: is_fraudulent ? 'var(--error-color)' : 'var(--success-color)'
            }}
          ></div>
        </div>
        <p className="helper-text">
          Confidence score based on 40 feature vector analysis.
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;
