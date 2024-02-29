import React from 'react';
import NotFoundImg from '../../assets/images/404.png';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <img src={NotFoundImg} style={{ width: '40%' }} alt="Not Found" />
    </div>
  );
};

export default NotFound;
