import React, { Component } from 'react';
import {Modal, Row, Col} from 'react-materialize';
import PlayerStatChartsContainerComponent from './PlayerStatChartsContainerComponent';
import '../../css/players/PlayerComponentCSS.css';

class PlayerComponent extends Component{
    state={
        playerInfo:{},
        class: "playerComponentBackground"
        //backgroundImage: ""

    }
    componentDidMount() {
        this.getPlayerInfo()
          .then(res => {
            this.setState(prevState=>({         
                playerInfo: {...prevState.playerInfo, 
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
                playerExperience: Number(res.resultSets[0].rowSet[0][23]) - Number(res.resultSets[0].rowSet[0][22])                
                },
                class: prevState.class + " " + res.resultSets[0].rowSet[0][18]
                //backgroundImage: `url('../../css/img/${res.resultSets[0].rowSet[0][18]}.png')`
            }));
        })
          .catch(err => console.log(err));
      }

      getPlayerInfo = async () => {
        const response = await fetch('/api/playerInfo/' + this.props.playerId);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(this.props.playerId,this.props.playerName);
        return body;
      };

    render(){
        return(
            <Modal header={this.props.playerName}
                trigger={this.props.trigger} className="playerComponentModal">  
                <Row className={this.state.class}>
                    <Col s={4} className='playerComponentPlayerPhoto'><img src={`https://nba-players.herokuapp.com/players/${this.props.playerName.split(" ")[1]}/${this.props.playerName.split(" ")[0]}`}></img></Col>
                    <Col s={2} className='grid'><h2 className="playerComponentTitleText">#{this.state.playerInfo.playerNumber}|{this.state.playerInfo.playerPosition}</h2><br/><h4 className="playerComponentTitleText">{this.state.playerInfo.playerTeam}</h4></Col>
                    {/* <Col s={2} className='grid'></Col> */}
                </Row>
                <Row className={`playerComponentTitleText ${this.state.class}`}>
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>HT</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerHeight}</h5>
                    </Col>
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>WT</p></div>  
                        <br/>  
                        <h5>{this.state.playerInfo.playerWeight} lbs</h5>
                    </Col>
                    <Col s={4} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Prior</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerCountryCollege}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowSpan="2">
                        <div className="playerComponentTile"><p>Pts</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerPoints}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowSpan="2">
                        <div className="playerComponentTile"><p>Rbs</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerRebounds}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowSpan="2">
                        <div className="playerComponentTile"><p>Ast</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerAssists}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid' rowSpan="2">
                        <div className="playerComponentTile"><p>PIE</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerPIE}</h5>
                    </Col>
                </Row>
                <Row className={`playerComponentTitleText ${this.state.class}`}>
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Age</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerAge}</h5>
                    </Col>
                    <Col s={2} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Born</p></div>  
                        <br/>  
                        <h5>{this.state.playerInfo.playerBirthday}</h5>
                    </Col>
                    <Col s={3} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Draft</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerDraft}</h5>
                    </Col>
                    <Col s={1} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Exp</p></div>    
                        <br/>
                        <h5>{this.state.playerInfo.playerExperience}</h5>
                    </Col>
                    <Col s={4} className='playerComponentGrid'>
                        <div className="playerComponentTile"><p>Name</p></div>    
                        <br/>
                        <h5>{this.props.playerName}</h5>
                    </Col>
                </Row>

                <Row>
                    <Col s={12}>
                        <PlayerStatChartsContainerComponent playerId={this.props.playerId}/>
                    </Col>
                </Row>                           
            </Modal>
        );
    }

}

export default PlayerComponent;