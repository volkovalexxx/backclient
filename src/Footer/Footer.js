import React from 'react';
import './Style.css';

const Footer = ({ activeSection, setActiveSection, userId }) => {
    const showSettingsButton = userId === 5914789619 || userId === 7506120714;

    return (
        <footer style={{ bottom: 0, position: 'fixed', width: '100%' }}>
            <div className="d-flex d-md-flex justify-content-center align-items-center justify-content-md-center align-items-md-center" style={{ width: '100%', height: '70px', padding: '5px 10px', marginBottom: '20px' }}>
                <div className="d-flex flex-row justify-content-around align-items-center" style={{ width: '100%', height: '100%', maxWidth: '500px' }}>
                <button 
                        className={`btn btn-primary ${activeSection === 'home' ? 'btn-section-active' : 'btn-section'}`} 
                        type="button" 
                        onClick={() => setActiveSection('home')}
                    >
                        <i className="fas fa-home" style={{ fontSize: '24px' }}></i>
                    </button>
                    <button 
                        className={`btn btn-primary ${activeSection === 'table' ? 'btn-section-active' : 'btn-section'}`} 
                        type="button" 
                        onClick={() => setActiveSection('table')}
                    >
                        <i className="fas fa-credit-card" style={{ fontSize: '24px' }}></i>
                    </button>
                    {showSettingsButton && (
                    <button 
                        className={`btn btn-primary ${activeSection === 'setting' ? 'btn-section-active' : 'btn-section'}`} 
                        type="button" 
                        onClick={() => setActiveSection('setting')}
                    >
                        <i className="icon ion-android-settings" style={{ fontSize: '30px', lineHeight: '30px' }}></i>
                    </button>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;