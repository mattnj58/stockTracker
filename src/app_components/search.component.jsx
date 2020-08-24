import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// import Company from './company.component';
import { NavLink } from 'react-router-dom';
// import {Link} from 'react-router-dom';

const apiBase = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
const fundamentals = 'https://finnhub.io/api/v1/stock/metric?symbol=';

class Search extends Component{

    constructor(props){
        super(props)
        this.state={
            ticker:'',
            logo:'',
            companyName:'',
            marketCap:'',
            beta:'',
            yearHigh: '',
            yearLow:''
        }
    }

    getTicker(e){
        this.setState({ticker: e.target.value});
    }

    search = async(e) => {

        var tick = e.target.value;

        if(tick){
            const call = await fetch(`${apiBase}${tick}&token=bs3tkvnrh5rbsfggfo6g`);
            const fund = await fetch(`${fundamentals}${tick}&metric=all&token=bs3tkvnrh5rbsfggfo6g`)
            if(call.status===200 && fund.status===200){
                const res = await call.json();
                const fundRes = await fund.json();

                this.setState({
                    logo: res.logo,
                    companyName: res.name,
                    marketCap: 'Market Cap: $' + res.marketCapitalization,
                    beta: 'Beta: ' + fundRes.metric.beta,
                    yearHigh: '52 Week High $' + fundRes.metric["52WeekHigh"],
                    yearLow: '52 Week Low $' + fundRes.metric["52WeekLow"]
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
            <Button onClick={this.search} value={this.state.ticker} className='mb-2'>Submit</Button>
            <div style={{fontSize: '40px', backgroundColor: '#00c853'}} className='mb-2'>
                <span><img src={this.state.logo} alt='' height='90px' /></span>
                <span><p>{this.state.companyName}</p></span>
                <span><p>{this.state.marketCap}</p></span>
                <span><p>{this.state.beta}</p></span>
                <span><p>{this.state.yearHigh}</p></span>
                <span><p>{this.state.yearLow}</p></span>
            </div>
        </div>
        );
    }
}


export default Search;
