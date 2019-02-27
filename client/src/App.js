import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Tabs, Col, Row, Button, Icon, Grid} from 'react-materialize'
import StatContainerComponent from './components/StatContainerComponent'


class App extends Component {
  state = {
    response: [],
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ response: res.resultSets });
        console.log("Response: " + this.state.response);})
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/seasonLeaderStats');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
render() {
    return (
      <div className="App">
        
        <div>
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <br/>
            <br/>
            <h1 className="header center blue-text">NBA Stats</h1>
            <div className="row center">
              <h5 className="header col s12 light">Check every NBA stat you can imagine!</h5>
            </div>      
            <br/><br/>
          </div>
        </div>

        <StatContainerComponent StatsSeason = {this.state.response}/>

        <footer className="page-footer blue">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">NBA Stats</h5>
              </div>        
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">      
            </div>
          </div>
        </footer>
      </div>


        
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
export default App;