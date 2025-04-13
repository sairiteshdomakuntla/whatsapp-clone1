import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LoginAndRegister, ChatsPage, PrivateRoute } from './pages';
import InterestSelection from './components/InterestSelection';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <ChatsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/login'>
          <LoginAndRegister />
        </PrivateRoute>
        <PrivateRoute exact path='/select-interest'>
          <InterestSelection />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
