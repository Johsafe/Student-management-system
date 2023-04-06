import React from 'react';
import { OrbitSpinner } from 'react-epic-spinners';

export default function LoadingBox() {
  return (
    <div>
      <OrbitSpinner color="blue" size={80} />
      <p style={{ fontSize: '2rem' }}>Please wait...</p>
    </div>
  );
}
