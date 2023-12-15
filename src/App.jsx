import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/AuthPage';
import HomePage from './pages/HomePage';

const App = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSuccess = () => {
    setLoginSuccess(true);
  };

  return (
    <Router>
      <div>
        <h1 className="text-center mt-5">FeyyFit</h1>

        <Route path="/login" render={(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} />} />
        {loginSuccess && <Route path="/home" component={HomePage} />}

      </div>
    </Router>
  );
};

export default App;
