import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading: React.FC = () => {
  return (
    <div className="card flex justify-content-center align-items-center h-screen w-full ">
      <ProgressSpinner
        strokeWidth="6"
        style={{ width: '25px', height: '25px' }}
      />
    </div>
  );
};

export default Loading;
