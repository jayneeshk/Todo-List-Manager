import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import TodoPage from './components/TodoPage';
import AuthPage from './components/AuthPage';
import ContactPage from './components/ContactPage';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('landing');

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'todo':
        return <TodoPage />;
      case 'auth':
        return <AuthPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </div>
  );
}

export default App;
