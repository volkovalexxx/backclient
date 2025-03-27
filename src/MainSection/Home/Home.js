import React, { useEffect, useState } from 'react';

const Home = () => {

    const [currentTime, setCurrentTime] = useState('00:00');
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [onlineOfflineCount, setOnlineOfflineCount] = useState(0);


    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/logs/logs');
                const data = await response.json();
                setConfirmedCount(data.filter(log => log.status === 'confirmed').length);
                setCancelledCount(data.filter(log => log.status === 'ban' || log.banStatus).length);
                setOnlineOfflineCount(data.filter(log => log.status === 'online' || log.status === 'offline').length);

            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();

        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <div className="container">
                <div className="row justify-content-around align-items-center">
                    <div className="col-md-4 d-flex align-items-center" style={{ padding: '20px 25px' }}>
                        <div style={{ width: '100%', textAlign: 'left' }}>
                            <h5 style={{ color: 'rgb(255,255,255)', fontFamily: 'ABeeZee, sans-serif', margin: 0, fontSize: '22px', lineHeight: '22px' }}>TIME</h5>
                        </div>
                        <div style={{ width: '100%', textAlign: 'right' }}>
                            <span style={{ color: 'rgb(255,255,255)', fontWeight: 'bold', fontSize: '16px', lineHeight: '16px' }}>{currentTime}</span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div style={{ width: '100%' }}>
                            <div style={{ width: '100%' }}>
                                <div className="d-flex d-sm-flex align-items-center align-items-sm-center" style={{ padding: '10px' }}>
                                    <i className="far fa-dot-circle flash animated infinite" style={{ color: 'rgb(0,255,25)', fontSize: '24px', lineHeight: '24px', marginRight: '10px' }}></i>
                                    <div style={{ width: '100%', textAlign: 'left' }}>
                                        <span style={{ color: 'rgb(255,255,255)' }}>LIVE LOG'S</span>
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'right' }}>
                                        <span style={{ color: 'rgb(255,255,255)', fontWeight: 'bold', fontSize: '18px' }}>{onlineOfflineCount}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className="d-flex d-sm-flex align-items-center align-items-sm-center" style={{ padding: '10px' }}>
                                    <i className="far fa-check-circle" style={{ color: 'rgb(0,255,25)', fontSize: '24px', lineHeight: '24px', marginRight: '10px' }}></i>
                                    <div style={{ width: '100%', textAlign: 'left' }}>
                                        <span style={{ color: 'rgb(255,255,255)' }}>CONFIRMED LOG'S</span>
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'right' }}>
                                        <span style={{ color: 'rgb(255,255,255)', fontWeight: 'bold', fontSize: '18px' }}>{confirmedCount}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <div className="d-flex d-sm-flex align-items-center align-items-sm-center" style={{ padding: '10px' }}>
                                    <i className="far fa-times-circle" style={{ color: 'rgb(255,0,0)', fontSize: '24px', lineHeight: '24px', marginRight: '10px' }}></i>
                                    <div style={{ width: '100%' }}>
                                        <span style={{ color: 'rgb(255,255,255)' }}>CANCEL LOG'S</span>
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'right' }}>
                                        <span style={{ color: 'rgb(255,255,255)', fontWeight: 'bold', fontSize: '18px' }}>{cancelledCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;