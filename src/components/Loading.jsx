import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className="loading-spinner">
      <p>Loading...</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
