import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-bootstrap'
// import Button from 'react-bootstrap/Button';

import Portfolio from './app_components/portfolio.component';
import Search from './app_components/search.component';
// import { Form, FormControl } from 'react-bootstrap';

require('dotenv').config();
//import Search from './app_components/search.componenet';

class App extends Component {
  state = {
    ticker:"",
    redirect:null
  }

  handleChange(event){
    this.setState({ticker: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.ticker);
    // alert(this.state.ticker);
    this.context.router.history.push('/Submit');
  }

  render(){
    return(
      <Router>
        <div className = "App">
          {/* <div className = "App-header">
            <Link to='/'>Dashboard</Link>
            <Link to='/Search'>Search</Link>
          </div>
          <Switch>
            <Route exact path='/'></Route>
            <Route exact path='/Search' component={Search}></Route>
          </Switch> */}
          <Navbar variant='dark' style={{backgroundColor:'#009624', margin:'auto', width:'auto'}}>
              <Navbar.Brand>
                <NavLink to='/stockTracker' style={{color:"black", fontSize:"25px"}}>Stock Viewer</NavLink>
              </Navbar.Brand>
              {/* <form inline onSubmit={this.handleSubmit.bind(this)}>
                <input type='text' placeholder='Search' className='mr-sm-2' value={this.state.ticker} onChange={this.handleChange.bind(this)}/>
                <button type='submit'>Submit</button>
              </form> */}
            {/* <Link to='/'>Home</Link> */}
            <Link to='/stockTracker/Search' style={{color:"black", fontSize:"25px"}}>Search</Link>
            </Navbar>
            <Switch>
              <Route path='/' component={Portfolio}/>
              <Route path='/stockTracker/Search' component={Search}></Route>
            </Switch>
          {/* <Portfolio/> */}
        </div>
      </Router>
      );
  }
}


export default App;
