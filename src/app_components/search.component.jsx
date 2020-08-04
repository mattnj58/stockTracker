import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// import Company from './company.component';
import { NavLink } from 'react-router-dom';
// import {Link} from 'react-router-dom';

const apiBase = 'https://finnhub.io/api/v1/stock/profile2?symbol='

class Search extends Component{

    constructor(props){
        super(props)
        this.state={
            ticker:'',
            logo:'',
            companyName:'',
            yearHigh:0
        }
    }

    getTicker(e){
        this.setState({ticker: e.target.value});
    }

    search = async(e) => {
        var tick = e.target.value;
        
        // console.log(tick);

        if(tick){
            const call = await fetch(`${apiBase}${tick}&token=bs3tkvnrh5rbsfggfo6g`);
            if(call.status===200){
                const res = await call.json();
                this.setState({
                    logo: res.logo,
                    companyName: res.name
                });
                console.log(this.state.logo);
                console.log(this.state.companyName);
            } else if(call.status===429){
                alert("You have exceeded the free tier limit, please try again later");
            } else {
                alert("Something went wrong, please try again later");
            }
        }
    }

    render(){
        return(
        <div>
            <input type='text' className='m-1' value={this.state.ticker} onChange={(e) => this.getTicker(e)}/>
            <Button onClick={this.search} value={this.state.ticker}>Submit</Button>
            <div>
                <span><img src={this.state.logo} alt='' height='30px' /></span>
                <span><p>{this.state.companyName}</p></span>
            </div>
        </div>
        );
    }
}


export default Search;
