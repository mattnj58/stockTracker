import React, {Component} from 'react';
const stocksURL = 'wss://ws.finnhub.io?token=bs3tkvnrh5rbsfggfo6g';
// const tiingo='wss://api.tiingo.com/iex'

// var subscribe ={
//     'eventName':'subscribe', 
//     'authorization': 'fc3ff2cc4162c09ab83de682f898be17103b1415', 
//     'eventData':{
//         'thresholdLevel':'5',
//         'tickers':['MSFT']
//     }
// }

class Portfolio extends Component{


    constructor(props){
        super(props)
        this.state = {
            symbols: ['MSFT','TSLA'],
            symbol:[],
            price: [],
            msftPrices:[],
            tslaPrices: [],
            messages: []
        }
    }

    componentDidMount = () => {
        this.connection = new WebSocket(stocksURL);
        var sym="";
        var p=0;

        this.connection.onmessage = evt => {
            var packet = JSON.parse(evt.data);
            console.log(packet)
            if(packet.type === "trade"){
                sym = packet.data[0].s;
                p = packet.data[0].p;
                if(sym==="MSFT"){
                    this.setState({
                        msftPrices: this.state.msftPrices.concat([p])
                    })
                } else if(sym==="TSLA"){
                    this.setState({
                        tslaPrices: this.state.tslaPrices.concat([p])
                    })
                }

                // console.log(this.state.msftPrices)
            } else if (packet.type!=="trade"){
                // sym = this.state.symbol;
                // p = this.state.msftPrices.split(-1);

            }

            // console.log(p)

            this.setState({
                symbol: sym,
                price: p,
                messages: this.state.messages.concat([evt.data])
            })
        };

        setInterval( _ => {
            if(!this.isOpen(this.connection)) return;
            // this.connection.send(JSON.stringify(subscribe));
            this.connection.send(JSON.stringify({'type':'subscribe', 'symbol':'TSLA'}))
            this.connection.send (JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}))
        },1000)
    }

    isOpen(ws){
        return ws.readyState === ws.OPEN
    }

    render(){
        return(
            <div>
                {/* <ul>{ this.state.messages.slice(-1).map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul> */}
                {/* <h1 style={{fontSize: '50px'}}>Dashboard</h1> */}
                <h1 style={{fontSize: '100px'}}>{this.state.symbols[0]}</h1>
                <h1 style={{fontSize: '75px'}}>{ this.state.msftPrices.slice(-1) }</h1>
                <h1 style={{fontSize: '100px'}}>{this.state.symbols[1]}</h1>
                <h2 style={{fontSize: '75px'}}> {this.state.tslaPrices.slice(-1)}</h2>
            </div>
        );
    }
}

export default Portfolio;