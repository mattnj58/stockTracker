import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'

import Portfolio from './app_components/portfolio.component';
import Search from './app_components/search.componenet';
// import Dashboard from './app_components/dashboard.component';

require('dotenv').config();
//import Search from './app_components/search.componenet';

class App extends Component {
    state = {
      connectionError: false
  }

  render(){
    return(
      <Router>
        <div className = "App">
          {/* <div className = "App-header">
            <Link to='/'>Dashboard</Link>
            <Link to='/Search'>Search</Link>
          </div> */}
          {/* <Switch>
            <Route exact path='/'></Route>
            <Route exact path='/Search' component={Search}></Route>
          </Switch> */}
          
          <Navbar variant='dark' style={{backgroundColor:'#3700b3', fontSize:"50px"}}>
              <Navbar.Brand>
                <Link to='/' style={{color:"white"}}>Stock Viewer</Link>
              </Navbar.Brand>
            </Navbar>
          <Portfolio/>
        </div>
      </Router>
    );
  }
}


export default App;
