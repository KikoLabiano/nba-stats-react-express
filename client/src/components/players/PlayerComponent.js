import React, { Component } from 'react';
import {Modal, Row, Col} from 'react-materialize';

class PlayerComponent extends Component{
    constructor(props){
        super(props);
    }

    state={
        playerCommonInfo: [],
        playerHeadlineStats: []
    }
    componentDidMount() {
        this.getPlayerInfo()
          .then(res => {
            console.log(res.resultSets);
            this.setState({ 
                playerCommonInfo: res.resultSets[0], 
                playerHeadlineStats: res.resultSets[1]
            });
            console.log(this.state.playerCommonInfo,this.state.playerHeadlineStats);})
          .catch(err => console.log(err));
      }

      getPlayerInfo = async () => {
        const response = await fetch('/api/playerInfo/' + this.props.playerId);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    render(){
        return(
            <Modal header={this.props.header}
                trigger={this.props.trigger}>  
                <Row>
                    <Col s={6} className='grid-example'><img src={`https://nba-players.herokuapp.com/players/${this.props.header.split(" ")[1]}/${this.props.header.split(" ")[0]}`}></img></Col>
                    <Col s={2} className='grid-example'><h2>#{this.state.playerCommonInfo[13]}|{this.state.playerCommonInfo[14]}|{this.state.playerCommonInfo[17]}</h2></Col>
                    <Col s={1} className='grid-example'>3</Col>
                    <Col s={1} className='grid-example'>4</Col>
                </Row>



                           
            </Modal>
        );
    }

}

export default PlayerComponent;