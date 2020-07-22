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
                <h1 className='app_header'>Dashboard</h1>
                <CardDeck>
                    <Card text={'white'} style={{backgroundColor:'#6200ee', fontSize:'100px', width:'50rem', margin:'auto', height:'350px'}}>
                        <Card.Title style={{fontSize:'100px'}}>{this.state.symbols[0]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $210.15</Card.Subtitle>
                        <Card.Text>{this.state.msftPrices.slice(-1)}</Card.Text>
                    </Card>
                    <Card text={'white'} style={{backgroundColor:'#6200ee', fontSize:'100px',width:'50rem', margin:'auto', height:'350px'}}>
                        <Card.Title style={{fontSize: '100px'}}>{this.state.symbols[1]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $640.11</Card.Subtitle>
                        <Card.Text>{this.state.tslaPrices.slice(-1)}</Card.Text>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

export default Portfolio;