import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
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
    <div>
      <header>
        <nav>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => setShowLogin(true)}>Login</button>
          )}
        </nav>
      </header>
      {/* Your app content */}
    </div>
  );
}
export default App;