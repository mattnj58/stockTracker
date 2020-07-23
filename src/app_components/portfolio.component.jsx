import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
const stocksURL = 'wss://ws.finnhub.io?token=bs3tkvnrh5rbsfggfo6g';

class Portfolio extends Component{
    constructor(props){
        super(props)
        this.state = {
            symbols: ['MSFT','TSLA'],
            msftPrices:['n/a'],
            msftChange:[0],
            tslaPrices: ['n/a'],
            tslaChange:[0]
        }
    }

    componentDidMount = () => {
        this.connection = new WebSocket(stocksURL);
        var sym="";
        var p=0;

        this.connection.onmessage = evt => {
            var packet = JSON.parse(evt.data);
            if(packet.type === "trade"){
                sym = packet.data[0].s;
                p = packet.data[0].p.toFixed(2);
                if(sym==="MSFT"){
                    this.setState({
                        msftPrices: this.state.msftPrices.concat(p),
                        msftChange: this.state.msftPrices.concat(this.diff(p,210))
                    })
                } else if(sym==="TSLA"){
                    this.setState({
                        tslaPrices: this.state.tslaPrices.concat(p),
                        tslaChange: this.state.tslaChange.concat(this.diff(p,1280.22))
                    })
                }
            }
        };

        setInterval( _ => {
            if(!this.isOpen(this.connection)) return;
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
                    <Card text={'black'} style={{backgroundColor: '#00c853',fontSize:'100px', width:'5rem', margin:'3rem', height:'350'}}>
                        <Card.Title style={{fontSize:'100px'}}>{this.state.symbols[0]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $210.15</Card.Subtitle>
                        <Card.Text>
                            <p style={{fontSize: '30px'}}>Currently Traded Price</p>
                            <p>${this.state.msftPrices.slice(-1)}</p>
                            <p style={{fontSize: '30px'}}>Total Gain/Loss</p>
                            <p>${this.state.msftChange.slice(-1)}</p>
                        </Card.Text>
                    </Card>
                    <Card text={'black'} style={{backgroundColor:'#78ff82', fontSize:'100px', width:'10px', margin:'3rem', height:'350'}}>
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