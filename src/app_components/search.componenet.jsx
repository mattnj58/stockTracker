import React, { Component } from 'react';

const apiBase = 'https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=bs3tkvnrh5rbsfggfo6g'

class Search extends Component{

    render(){
        return(
        <div>
            <h1>Search</h1>
            
            <form>
                <input type='text' placeholder='Enter a Ticker Symbol' name='ticker'></input>
            </form>
            <button onClick={search}>Add</button>
        </div>
        );
    }
}

function search(e) {
    e.preventDefault();
    console.log("button has been clicked");

    // var ticker = this.ticker;

    // if(ticker){
    //     const call = fetch(apiBase)
    //     const res = call.json();
    //     if(call.status===200){
    //         console.log(call);
    //         console.log(res);
    //     }
    // }
}

export default Search;
