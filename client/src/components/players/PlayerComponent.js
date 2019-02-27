import React, { Component } from 'react';
import {Modal, Row, Col} from 'react-materialize';
import '../../css/PlayerComponentCSS.css';

class PlayerComponent extends Component{
    state={
        playerCommonInfo: [],
        playerHeadlineStats: [],
        prueba: ""
    }
    componentDidMount() {
        this.getPlayerInfo()
          .then(res => {
            console.log(res.resultSets);
            this.setState({ 
                playerCommonInfo: res.resultSets[0], 
                playerHeadlineStats: res.resultSets[1],
                playerNumber: res.resultSets[0].rowSet[0][13],
                playerPosition: res.resultSets[0].rowSet[0][14],
                playerTeam: res.resultSets[0].rowSet[0][20] + res.resultSets[0].rowSet[0][17],
                backgroundImage: `url('../../css/img/${res.resultSets[0].rowSet[0][18]}.png')`
            });
            console.log(this.state.playerCommonInfo.rowSet[0][13],this.state.playerHeadlineStats.rowSet[0]);
        })
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
                <Row className="backTeamPlayerProfile" style={{backgroundImage: this.state.backgroundImage, backgroundRepeat: 'no-repeat', backgroundPosition: 'right', backgroundColor:'rgba(0, 0, 0, 0.1)'}}>
                    <Col s={4} className='grid'><img src={`https://nba-players.herokuapp.com/players/${this.props.header.split(" ")[1]}/${this.props.header.split(" ")[0]}`} style={{marginBottom: '-5px'}}></img></Col>
                    <Col s={2} className='grid'><h2>#{this.state.playerNumber}|{this.state.playerPosition}</h2></Col>
                    <Col s={2} className='grid'><h4>{this.state.playerTeam}</h4></Col>
                </Row>
                


                           
            </Modal>
        );
    }

}

export default PlayerComponent;