import React from 'react';
import Home from './Home/Home';
import Table from './Table/Table';
import Setting from './Setting/Setting';

const MainSection = ({ activeSection }) => {
    return (
        <div>
            {activeSection === 'home' && <Home />}
            {activeSection === 'table' && <Table />}
            {activeSection === 'setting' && <Setting />}
        </div>
    );
};

export default MainSection;