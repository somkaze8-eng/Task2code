import { useEffect, useState } from 'react';
import Login from './Login';
import Home from './Home';
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (showLogin) {
    return (
      <Login
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setShowLogin(false);
        }}
      />
    );
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <nav>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => setShowLogin(true)}>Login</button>
          )}
        </nav>
      </header>

      <main className="app-main">
        {isLoggedIn ? (
          <Home />
        ) : (
          <div className="landing">
            <h1>Welcome to the App</h1>
            <p>Please login to continue.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
