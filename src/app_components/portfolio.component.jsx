import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import './portfolio.css';
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
            msftPrices:['-'],
            msftChange:[0],
            tslaPrices: ['-'],
            tslaChange:[0],
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
                        msftPrices: this.state.msftPrices.concat(p),
                        msftChange: this.state.msftPrices.concat(this.diff(p,210))
                    })
                } else if(sym==="TSLA"){
                    this.setState({
                        tslaPrices: this.state.tslaPrices.concat([p]),
                        tslaChange: this.state.tslaChange.concat(this.diff(p,1280.22))
                    })
                    console.log(packet)
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

    diff(price,ogPrice){
        
        return (price-ogPrice).toFixed(2);
    }

    render(){
        return(
            <div>
                {/* <ul>{ this.state.messages.slice(-1).map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul> */}
                <CardDeck>
                    <Card text={'white'} style={{backgroundColor: '#6200ee',fontSize:'100px', width:'18rem', margin:'3rem', height:'auto'}}>
                        <Card.Title style={{fontSize:'100px'}}>{this.state.symbols[0]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $210.15</Card.Subtitle>
                        <Card.Text>
                            <p style={{fontSize: '30px'}}>Currently Traded Price</p>
                            <p>${this.state.msftPrices.slice(-1)}</p>
                            <p style={{fontSize: '30px'}}>Total Gain/Loss</p>
                            <p>${this.state.msftChange.slice(-1)}</p>
                        </Card.Text>
                    </Card>
                    <Card text={'white'} style={{backgroundColor:'#6f33c2', fontSize:'100px', width:'18rem', margin:'3rem', height:'auto'}}>
                        <Card.Title style={{fontSize: '100px'}}>{this.state.symbols[1]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $1280.22</Card.Subtitle>
                        <Card.Text>
                            <p style={{fontSize: '30px'}}>Currently Traded Price</p>
                            <p>${this.state.tslaPrices.slice(-1)}</p>
                            <p style={{fontSize: '30px'}}>Total Gain/Loss</p>
                            <p>${this.state.tslaChange.slice(-1)}</p>
                        </Card.Text>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

export default Portfolio;