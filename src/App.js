import React, { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import Welcome from './Welcome/Welcome';
import MainSection from './MainSection/MainSection';
import Footer from './Footer/Footer';

const App = () => {
  const userName = window.Telegram.WebApp.initDataUnsafe.user?.first_name || 'Гость';
  const userId = window.Telegram.WebApp.initDataUnsafe.user?.id; // Получаем ID пользователя

  // Состояние для текущей активной секции
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      <Header />
      <Welcome userName={userName} />
      <MainSection activeSection={activeSection} />
      <Footer 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        userId={userId}
      />
    </div>
  );
}

export default App;