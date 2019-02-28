import React, { Component } from 'react';
import {Modal, Row, Col} from 'react-materialize';
import '../../css/PlayerComponentCSS.css';

class PlayerComponent extends Component{
    state={
        playerNumber: "",
        playerPosition: "",
        playerTeam: "",
        playerHeight: "",
        playerWeight: "",
        playerCountryCollege: "",
        playerBirthday: "",
        playerPoints: "",
        playerRebounds: "",
        playerAssists: "",
        playerPIE: "",
        playerAge: "",
        playerDraft: "",
        playerExperience: "",
        backgroundImage: ""

    }
    componentDidMount() {
        this.getPlayerInfo()
          .then(res => {
            console.log(res.resultSets);
            this.setState({         
                playerNumber: res.resultSets[0].rowSet[0][13],
                playerPosition: res.resultSets[0].rowSet[0][14],
                playerTeam: res.resultSets[0].rowSet[0][20] + res.resultSets[0].rowSet[0][17],
                playerHeight: res.resultSets[0].rowSet[0][10],
                playerWeight: res.resultSets[0].rowSet[0][11],
                playerCountryCollege: res.resultSets[0].rowSet[0][9],
                playerBirthday: res.resultSets[0].rowSet[0][6].substring(0,10),
                playerPoints: res.resultSets[1].rowSet[0][3],
                playerRebounds: res.resultSets[1].rowSet[0][5],
                playerAssists: res.resultSets[1].rowSet[0][4],
                playerPIE: Number(res.resultSets[1].rowSet[0][6])*100,
                playerAge: Number(new Date().getFullYear()) - Number(res.resultSets[0].rowSet[0][6].substring(0,4)),
                playerDraft: res.resultSets[0].rowSet[0][22] + " Rnd " + res.resultSets[0].rowSet[0][28] + " Pick " + res.resultSets[0].rowSet[0][29],
                playerExperience: Number(res.resultSets[0].rowSet[0][23]) - Number(res.resultSets[0].rowSet[0][22]),
                backgroundImage: `url('../../css/img/${res.resultSets[0].rowSet[0][18]}.png')`
            });
            //console.log(this.state.playerCommonInfo.rowSet[0][13],this.state.playerHeadlineStats.rowSet[0]);
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
            <Modal header={this.props.playerName}
                trigger={this.props.trigger} className="playerComponentModal">  
                <Row className="playerComponentBackground" style={{backgroundImage: this.state.backgroundImage}}>
                    <Col s={4} className='playerComponentPlayerPhoto'><img src={`https://nba-players.herokuapp.com/players/${this.props.playerName.split(" ")[1]}/${this.props.playerName.split(" ")[0]}`}></img></Col>
                    <Col s={2} className='grid'><h2 className="playerComponentTitleText">#{this.state.playerNumber}|{this.state.playerPosition}</h2></Col>
                    <Col s={2} className='grid'><h4 className="playerComponentTitleText">{this.state.playerTeam}</h4></Col>
                </Row>
                <Row className="playerComponentBackground playerComponentTitleText">
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>HT</p></div>    
                        <br/>
                        <h5>{this.state.playerHeight}</h5>
                    </Col>
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>WT</p></div>  
                        <br/>  
                        <h5>{this.state.playerWeight} lbs</h5>
                    </Col>
                    <Col s={4} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Prior</p></div>    
                        <br/>
                        <h5>{this.state.playerCountryCollege}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowspan="2">
                        <div className="playerComponentTile"><p>Pts</p></div>    
                        <br/>
                        <h5>{this.state.playerPoints}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowspan="2">
                        <div className="playerComponentTile"><p>Rbs</p></div>    
                        <br/>
                        <h5>{this.state.playerRebounds}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowspan="2">
                        <div className="playerComponentTile"><p>Ast</p></div>    
                        <br/>
                        <h5>{this.state.playerAssists}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowspan="2">
                        <div className="playerComponentTile"><p>PIE</p></div>    
                        <br/>
                        <h5>{this.state.playerPIE}</h5>
                    </Col>
                </Row>
                <Row className="playerComponentBackground playerComponentTitleText">
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Age</p></div>    
                        <br/>
                        <h5>{this.state.playerAge}</h5>
                    </Col>
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Born</p></div>  
                        <br/>  
                        <h5>{this.state.playerBirthday}</h5>
                    </Col>
                    <Col s={3} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Draft</p></div>    
                        <br/>
                        <h5>{this.state.playerDraft}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Exp</p></div>    
                        <br/>
                        <h5>{this.state.playerExperience}</h5>
                    </Col>
                    <Col s={4} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Name</p></div>    
                        <br/>
                        <h5>{this.props.playerName}</h5>
                    </Col>
                </Row>


                           
            </Modal>
        );
    }

}

export default PlayerComponent;