import React, { Component } from 'react';
import {Tabs, Tab} from 'react-materialize';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class PlayerStatChartsContainerComponent extends Component{

    state={
        playerPointsBySeason:[],
        playerReboundsBySeason:[],
        playerAssistsBySeason:[],
        options: {
          title: {
            text: 'Stats'
        },
        subtitle: {
          text: ''
        },
        yAxis: {
          title: {
              text: 'Values'
          }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
    
        series: [{
            name: 'Points',
            data: []
        }, {
            name: 'Rebounds',
            data: []
        }, {
            name: 'Assists',
            data: []
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
        }
    }

    
    componentDidMount(){
        this.getPlayerStats()
          .then(res => {
              let seasonTotalsRS = res.resultSets.filter( function (el) {
                return el.name === "SeasonTotalsRegularSeason";
              });
            // console.log(seasonTotalsRS[0].rowSet[0]);

            let seasons = [];
            let points = [];
            let rebounds = [];
            let assists = [];
            let initSeason = Number(seasonTotalsRS[0].rowSet[0][1].toString().substring(0,4));
            seasonTotalsRS[0].rowSet.forEach((season,i)=>{
              seasons.push(season[1]);
              points.push(Number((Number(season[26])/Number(season[6])).toFixed(2)));
              rebounds.push(Number((Number(season[26])/Number(season[20])).toFixed(2)));
              assists.push(Number((Number(season[26])/Number(season[21])).toFixed(2)));
              
            });

            this.setState(prevState=>({  
            options: {...prevState.options,
              subtitle: {text: 'Pruebaaa'},
              plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: initSeason
                }
            },
              series: [{
                    name: 'Points',
                    data: points
                }, {
                    name: 'Rebounds',
                    data: rebounds
                }, {
                    name: 'Assists',
                    data: assists
                }]
            }
            }));
        })
          .catch(err => console.log(err));
      }

    getPlayerStats = async () => {
        const response = await fetch('/api/playerStats/' + this.props.playerId);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    render(){
        return(
            <div className="container playerStatChartsContainer">
            <div className="section">
            <Tabs className='tab-demo z-depth-1' >
                <Tab title="Career RS Stats" active>
                <div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={this.state.options}
                    />
                  </div>
                </Tab>
                <Tab title="Career Playoffs Stats"></Tab>
                <Tab title="Career totals"></Tab>
                <Tab title="Career highs"></Tab>
                <Tab title="Blocks"></Tab>
            </Tabs>
            </div>
            <br/>
            <br/>
        </div>    

        );
    }

}

export default PlayerStatChartsContainerComponent;