import React from 'react';
import { SemipolarSpinner } from 'react-epic-spinners';

export default function LoadingBoxMini() {
  return (
    <div style={{ padding: '6rem', marginLeft: '7rem' }}>
      <SemipolarSpinner color="blue" size={120} animationDelay={1000} />
      <p style={{ fontSize: '1.2rem' }}>Please Wait...</p>
    </div>
  );
}
