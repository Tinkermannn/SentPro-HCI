import React from 'react';

export default function ReviewCard({ data, onOpenLogicExplanation }) {
  return (
    <div className="review-card">
      {/* Left Column (Text info) */}
      <div className="card-left">
        <div className="info-box">
          <div className="info-text">
            <span className="info-title">Product Name: </span>[{data.productName}]
            <br />
            <span className="info-title">Review ID: </span>
            <span className="info-id">[{data.reviewId}]</span>
          </div>
        </div>
        
        <div className="info-box" style={{ flex: 1 }}>
          <div className="info-text">
            {data.text}
          </div>
        </div>
      </div>

      {/* Center Column (Image) */}
      <div className={`card-center ${data.isBlackScreen ? 'black-screen' : ''}`}>
        {data.isBlackScreen ? (
          "Image (Black Screen)"
        ) : (
          <img src={data.imageUrl} alt="Review attachment" />
        )}
      </div>

      {/* Right Column (Gauges and Buttons) */}
      <div className="card-right">
        <div className="gauge-container">
          <div className={`circular-gauge ${data.status}`}>
            <span>{data.confidenceScore}%</span>
          </div>
          <div className="gauge-label">Confidence Score</div>
        </div>
        
        <div className="card-actions">
          <button className="btn btn-white" onClick={onOpenLogicExplanation}>
            Brief Logic<br />Explanation
          </button>
          <button className="btn btn-blue">
            Details &<br />Action
          </button>
        </div>
      </div>
    </div>
  );
}
