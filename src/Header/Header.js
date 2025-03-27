import React from 'react';

const Header = () => {
  return (
    <div style={{ width: '100%' }}>
    <div className="container" style={{ boxShadow: '0px 1px 20px rgb(0,22,136)', borderRadius: '35px', borderTopLeftRadius: '0', borderTopRightRadius: '0', width: '100%' }}>
        <div className="d-flex align-items-center" style={{ width: '100%', paddingLeft: '10px', paddingRight: '10px', borderRadius: '51px' }}>
            <div className="d-flex justify-content-start align-items-center" style={{ width: '100%', height: '70px' }}>
                <i className="icon ion-planet" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '45px', lineHeight: '45.5px', textShadow: '0px 0px 20px rgba(255,255,255,0.66)' }}></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-end" style={{ width: '100%', height: '70px', textAlign: 'left' }}>
                <h1 style={{ color: 'rgb(255,255,255)', margin: '0', fontFamily: 'ABeeZee, sans-serif', textShadow: '0px 0px 20px rgba(255,255,255,0.87)' }}>
                    C<sup><strong><span style={{ color: 'rgb(10, 83, 190)' }}>Y</span></strong></sup>BER
                </h1>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Header;
