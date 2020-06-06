import React from 'react';

const Cross = () => {
  return (
    <svg className="cross">
      <line className="crossline" x1="17" y1="22" x2="43" y2="46" />
      <line className="crossline" x1="43" y1="22" x2="17" y2="46" />
    </svg>
  );
}

export default Cross;