import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import './portfolio.css'
const stocksURL = 'wss://ws.finnhub.io?token=bt1t0a748v6rjbouko1g';

class Portfolio extends Component{
    constructor(props){
        super(props)
        this.state = {
            symbols: ['MSFT','TSLA', 'AAPL'],
            msftPrices:['N/A'],
            msftChange:[0],
            msftPct:[0],
            tslaPrices: ['N/A'],
            tslaChange:[0],
            tslaPct:[0],
            aaplPrices:['N/A'],
            aaplChange:[0],
            aaplPct:[0],
            upsPrices:['N/A'],
            upsChange:[0],
            upsPct:[0],
            bought: [210.15, 748.87, 116.35],
            
        }
    }

    componentDidMount = () => {
        this.connection = new WebSocket(stocksURL);
        var sym="";
        var p=0;

        
        this.connection.onmessage = evt => {
            var packet = JSON.parse(evt.data);
            console.log(packet);
            if(packet.type === "trade"){
                sym = packet.data[0].s;
                p = packet.data[0].p.toFixed(2);
                if(sym==="MSFT"){
                    this.setState({
                        msftPrices: p,
                        msftChange: this.diff(p,this.state.bought[0]),
                        msftPct: this.pctChange(p,this.state.bought[0])
                    })
                } else if(sym==="TSLA"){
                    this.setState({
                        tslaPrices: p,
                        tslaChange: this.diff(p,this.state.bought[1]),
                        tslaPct: this.pctChange(p,this.state.bought[1])
                    })
                } else if(sym==='AAPL'){
                    this.setState({
                        aaplPrices: p,
                        aaplChange: this.diff(p,this.state.bought[2]),
                        aaplPct: this.pctChange(p,this.state.bought[2])
                    })
                } else if(sym==="UPS"){
                    this.setState({
                        upsPrices: p,
                        upsChange: this.diff(p,this.state.bought[3]),
                        upsPct: this.pctChange(p,this.state.bought[3])
                    })
                } 
                else {
                    console.log(packet);
                }
            }
        };

        setInterval( _ => {
            if(!this.isOpen(this.connection)) return;
            for(var i=0; i<this.state.symbols.length; i++){
                this.connection.send(JSON.stringify({'type':'subscribe', 'symbol':this.state.symbols[i]}))
            }
        },100)
    }

    componentWillUnmount = () =>{
        this.connection.close();
    }

    isOpen(ws){
        return ws.readyState === ws.OPEN
    }

    diff(price, ogPrice){
        
        return (price-ogPrice).toFixed(2);
    }

    pctChange(price, ogPrice){
        return ((100*((price-ogPrice)/ogPrice)).toFixed(2));
    }

    render(){
        return(
            <div>
                {/* <ul>{ this.state.messages.slice(-1).map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul> */}
                <CardDeck className='p-3'>
                    <Card text={'white'} style={{backgroundColor: '#3f50b5', padding:'auto'}} className='stockCard'>
                        <Card.Title style={{fontSize:'90px'}}>{this.state.symbols[0]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: ${this.state.bought[0]}</Card.Subtitle>
                        <Card.Text style={{fontSize: '40px'}}>Currently Traded Price</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>${this.state.msftPrices}</Card.Text>
                        <Card.Text style={{fontSize: '40px'}}>Total Gain/Loss Per Share</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>${this.state.msftChange}</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>{this.state.msftPct}&#37;</Card.Text>
                    </Card>
                    <Card text={'white'} style={{backgroundColor:'#3f50b5', padding:'auto'}} className='stockCard'>
                        <Card.Title style={{fontSize: '90px'}}>{this.state.symbols[1]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: ${this.state.bought[1]}</Card.Subtitle>
                        <Card.Text style={{fontSize: '40px'}}>Currently Traded Price</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>${this.state.tslaPrices}</Card.Text>
                        <Card.Text style={{fontSize: '40px'}}>Total Gain/Loss Per Share</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>${this.state.tslaChange}</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>{this.state.tslaPct}&#37;</Card.Text>
                    </Card>
                    <Card text={'white'} style={{backgroundColor:'#3f50b5', padding:'auto'}} className='stockCard'>
                        <Card.Title style={{fontSize: '90px'}}>{this.state.symbols[2]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: ${this.state.bought[2]}</Card.Subtitle>
                        <Card.Text style={{fontSize: '40px'}}>Currently Traded Price</Card.Text>
                        <Card.Text style={{fontSize:'100px'}}>${this.state.aaplPrices}</Card.Text>
                        <Card.Text style={{fontSize: '40px'}}>Total Gain/Loss Per Share</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>${this.state.aaplChange}</Card.Text>
                        <Card.Text style={{fontSize: '100px'}}>{this.state.aaplPct}&#37;</Card.Text>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

export default Portfolio;