import React, {useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
//components
import Dashboard from './Components/Dashboard';
import Dashboard_man from './Components/Dashboard_man';
import Dashboard_fin from './Components/Dashboard_fin';

import Login from './Components/Login';
import Register from './Components/Register';
//react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {

  const [isAuthenticated, SetisAuthenticated] = useState(false);

  const [dashboard, Setdashboard] = useState('');

  const SetDash = str1 => {
      Setdashboard(str1);
      console.log(dashboard);
  };

  const setAuth = boolean => {
      SetisAuthenticated(boolean);
  };
  
  async function isAuth() {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify',
      {
        method : 'GET',
        headers : { token : localStorage.token }
      });

      const Parseres = await response.json();
      //console.log(Parseres);
      Parseres === true ? SetisAuthenticated(true) : SetisAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(()=> {
    isAuth();
  });

  return (
    <div>
      <Router>
        <div className='container' >
          <Switch>
            <Route exact path='/login' 
              render={props => !isAuthenticated ? <Login setAuth={setAuth} /> : <Redirect to='/dashboard'/> }> 
            </Route>
            <Route exact path='/register' 
              render={props => !isAuthenticated ? <Register setAuth={setAuth} SetDash={SetDash} /> : <Redirect to='/login'/> }>
              </Route>
            <Route exact path='/dashboard' 
              //render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to='/login'/> }>
              render = {() => {
                if(isAuthenticated) {
                  if(dashboard === 'employee') return <Dashboard setAuth={setAuth} />;
                  else if (dashboard === 'management') return <Dashboard_man setAuth={setAuth} />;
                  else return <Dashboard_fin setAuth={setAuth} />;
                }
                else return <Redirect to='/login'/>;
              }}>
              </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
