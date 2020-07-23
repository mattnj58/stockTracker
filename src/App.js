import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Portfolio from './app_components/portfolio.component';
import Search from './app_components/search.componenet';
import { InputGroup, Form, FormControl } from 'react-bootstrap';
// import Dashboard from './app_components/dashboard.component';

require('dotenv').config();
//import Search from './app_components/search.componenet';

class App extends Component {
  state = {
    ticker:""
  }
  
  handleSubmit(event){
    this.setState({ticker: this.event.target.ticker})
    console.log("this button has been clicked")
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
          
          <Navbar variant='dark' style={{backgroundColor:'#009624', margin:'auto', width:'auto'}}>
              <Navbar.Brand>
                <Link to='mattnj58.github.io/stockTracker' style={{color:"black", fontSize:"50px"}}>Stock Viewer</Link>
              </Navbar.Brand>
              <Form inline onSubmit={this.handleSubmit}>
                <FormControl type='text' placeholder='Search' className='mr-sm-2'/>
                <Button type="submit">Submit</Button>
              </Form>
            </Navbar>
          <Portfolio/>
        </div>
      </Router>
    );
  }
}


export default App;
