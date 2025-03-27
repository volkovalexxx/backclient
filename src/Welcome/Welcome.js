import React from 'react';
import templateImg from './img/Tick_Mark_Dark_icon-icons.com_69147.svg'


const Welcome = ({ userName }) => {
    return (
        <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', padding: '20px' }}>
            <span style={{ fontWeight: 'bold', color: 'rgb(255,255,255)' }}>
                Welcome, <span style={{ color: 'rgb(10,83,190)' }}>{userName}</span>
            </span>
            <img 
                src={window.Telegram.WebApp.initDataUnsafe.user?.photo_url || templateImg} 
                alt="User" 
                style={{ width: '60px', height: '60px' }} 
            />
        </div>
    );
};

export default Welcome;