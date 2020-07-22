import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
          {/* <div className = "App-header">
            <Link to='/'>Dashboard</Link>
            <Link to='/Search'>Search</Link>
          </div> */}
          {/* <Switch>
            <Route exact path='/'></Route>
            <Route exact path='/Search' component={Search}></Route>
          </Switch> */}
          <Portfolio/>
        </div>
      </Router>
    );
  }
}


export default App;
