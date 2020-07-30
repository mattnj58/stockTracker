import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

const apiBase = 'https://finnhub.io/api/v1/stock/profile2?symbol='
// AAPL&metric=all&token=bs3tkvnrh5rbsfggfo6g

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
        var yHigh="52WeekHigh";

        if(tick){
            const call = await fetch(`${apiBase}${tick}`);
            const res = await call.json();
            console.log(call.status);
            if(call.status===200){
                this.setState({
                    logo: res.logo,
                    companyName: res.name
                });
                console.log(this.state.logo);
                console.log(this.state.companyName);
            } else if(call.status===429){
                alert("Something went wrong, try again later");
            }
        }
    }

    render(){
        return(
        <div>
            <input className='m-1' value={this.state.ticker} onChange={(e) => this.getTicker(e)}/>
            <Button onClick={this.search} value={this.state.ticker}>Submit</Button>
            <img src={this.state.logo} alt='' height='25px'/>
        </div>
        );
    }
}

// function search(e) {
//     e.preventDefault();

//     setState({
//         ticker: e.target.value
//     });

//     const request = require('request');
//     console.log(this.state.ticker);

//     // request('https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=bs3tkvnrh5rbsfggfo6g', { json: true }, (err, res, body) => {
//     // if (err) { return console.log(err); }
//     // console.log(body.url);
//     // console.log(body.explanation);
//     // });

//     // var ticker = e.target.ticker;
//     // console.log(ticker);
//     // if(ticker){
//     //     console.log(ticker)
//         // const call = fetch(`${apiBase}`)
//         // const res = call.json();
//         // if(call.status===200){
//         //     console.log(call);
//         //     console.log(res);
//         // }
//     // }
// }

export default Search;
