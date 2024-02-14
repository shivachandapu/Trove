import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Web3 from 'web3';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication status in local storage
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Set isAuthenticated to true and store it in local storage
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    // Set isAuthenticated to false and remove it from local storage
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route exact path="/login">
            <Login setIsAuthenticated={handleLogin} />
          </Route>
          <Route exact path="/register">
            <Register setIsAuthenticated={handleLogin} />
          </Route>
          {/* Private Route (Dashboard) */}
          <PrivateRoute
            exact
            path="/home"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;