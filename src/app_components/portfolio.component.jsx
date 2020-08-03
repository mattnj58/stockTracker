import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
const stocksURL = 'wss://ws.finnhub.io?token=bs3tkvnrh5rbsfggfo6g';

class Portfolio extends Component{
    constructor(props){
        super(props)
        this.state = {
            symbols: ['MSFT','TSLA', 'AAPL'],
            msftPrices:['n/a'],
            msftChange:[0],
            msftPct:[0],
            tslaPrices: ['n/a'],
            tslaChange:[0],
            tslaPct:[0],
            aaplPrices:['n/a'],
            aaplChange:[0],
            aaplPct:[0]
        }
    }

    componentDidMount = () => {
        this.connection = new WebSocket(stocksURL);
        var sym="";
        var p=0;

        this.connection.onmessage = evt => {
            var packet = JSON.parse(evt.data);
            // console.log(packet)
            if(packet.type === "trade"){
                sym = packet.data[0].s;
                p = packet.data[0].p.toFixed(2);
                if(sym==="MSFT"){
                    this.setState({
                        msftPrices: this.state.msftPrices.concat(p),
                        msftChange: this.state.msftPrices.concat(this.diff(p,210)),
                        msftPct: this.state.msftPct.concat(this.pctChange(p,210))
                    })
                } else if(sym==="TSLA"){
                    this.setState({
                        tslaPrices: this.state.tslaPrices.concat(p),
                        tslaChange: this.state.tslaChange.concat(this.diff(p,1280.22)),
                        tslaPct: this.state.tslaPct.concat(this.pctChange(p,1280.22))
                    })
                } else if(sym==='AAPL'){
                    this.setState({
                        aaplPrices:this.state.aaplPrices.concat(p),
                        aaplChange:this.state.aaplChange.concat(this.diff(p,442.56)),
                        aaplPct: this.state.aaplPct.concat(this.pctChange(p,442.56))
                    })
                }
            }
        };

        setInterval( _ => {
            if(!this.isOpen(this.connection)) return;
            for(var i=0; i<this.state.symbols.length; i++){
                this.connection.send(JSON.stringify({'type':'subscribe', 'symbol':this.state.symbols[i]}))
            }
        },1000)
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
                <CardDeck>
                    <Card text={'black'} style={{backgroundColor: '#00c853',fontSize:'90px', width:'5rem', margin:'3rem', height:'350'}}>
                        <Card.Title style={{fontSize:'90px'}}>{this.state.symbols[0]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $210.15</Card.Subtitle>
                        <Card.Text style={{fontSize: '40px'}}>Currently Traded Price</Card.Text>
                        <Card.Text>${this.state.msftPrices.slice(-1)}</Card.Text>
                        <Card.Text style={{fontSize: '40px'}}>Total Gain/Loss</Card.Text>
                        <Card.Text>${this.state.msftChange.slice(-1)}</Card.Text>
                        <Card.Text>{this.state.msftPct.slice(-1)}&#37;</Card.Text>
                    </Card>
                    <Card text={'black'} style={{backgroundColor:'#78ff82', fontSize:'90px', width:'10px', margin:'3rem', height:'350'}}>
                        <Card.Title style={{fontSize: '90px'}}>{this.state.symbols[1]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $1280.22</Card.Subtitle>
                        <Card.Text style={{fontSize: '40px'}}>Currently Traded Price</Card.Text>
                        <Card.Text>${this.state.tslaPrices.slice(-1)}</Card.Text>
                        <Card.Text style={{fontSize: '40px'}}>Total Gain/Loss</Card.Text>
                        <Card.Text>${this.state.tslaChange.slice(-1)}</Card.Text>
                        <Card.Text>{this.state.tslaPct.slice(-1)}&#37;</Card.Text>
                    </Card>
                    <Card text={'black'} style={{backgroundColor:'#78ff82', fontSize:'90px', width:'10px', margin:'3rem', height:'350'}}>
                        <Card.Title style={{fontSize: '90px'}}>{this.state.symbols[2]}</Card.Title>
                        <Card.Subtitle style={{fontSize:'40px'}}>Price bought at: $442.56</Card.Subtitle>
                        <Card.Text style={{fontSize: '40px'}}>Currently Traded Price</Card.Text>
                        <Card.Text>${this.state.aaplPrices.slice(-1)}</Card.Text>
                        <Card.Text style={{fontSize: '40px'}}>Total Gain/Loss</Card.Text>
                        <Card.Text>${this.state.aaplChange.slice(-1)}</Card.Text>
                        <Card.Text>{this.state.aaplPct.slice(-1)}&#37;</Card.Text>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

export default Portfolio;