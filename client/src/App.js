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
import DisplayReceipts from './Components/DisplayReceipts';
import DisplayReceipts_man from './Components/DisplayReceipts_man';
import DisplayReceipts_fin from './Components/DisplayReceipts_fin';

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

  async function getname() {
    try {
        const response = await fetch('http://localhost:5000/dashboard',{
            method : 'GET',
            headers : { token : localStorage.token }
        });
        const Parseres = await response.json();
        //console.log(Parseres);
        Setdashboard(Parseres.user_designation);
    } catch (error) {
        console.error(error.message);
    }
};

  useEffect(()=> {
    isAuth();
    getname();//eslint-disable-next-line
  });

  return (
    <div>
      <Router>
          <Switch>
            <Route exact path='/login' 
              render={props => !isAuthenticated ? <Login setAuth={setAuth} SetDash={SetDash} /> : <Redirect to='/dashboard'/> }> 
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
                  else if (dashboard === 'finance') return <Dashboard_fin setAuth={setAuth} />;
                }
                else return <Redirect to='/login'/>;
              }}>
              </Route>
              <Route exact path='/all_receipts' 
              //render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to='/login'/> }>
              render = {() => {
                if(isAuthenticated) {
                  if(dashboard === 'employee') return <DisplayReceipts />;
                  else if (dashboard === 'management') return <DisplayReceipts_man />;
                  else if (dashboard === 'finance') return <DisplayReceipts_fin />;
                }
                else return <Redirect to='/login'/>;
              }}>
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
