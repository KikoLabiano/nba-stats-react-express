import React,{Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class PlayerChartComponent extends Component{

    state={
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
        // console.log("PlayerChartComponent loaded!");
        this.filterData(this.props.data,this.props.statType);
      }

      filterData = async (dat,statName)=>{
            //TODO check undefined??
          if(typeof(dat.resultSets)!=="undefined"){
            let seasonTotalsRS = dat.resultSets.filter( function (el) {
                return el.name === statName;
            });
            let seasons = [];
            let points = [];
            let rebounds = [];
            let assists = [];
            let initSeason = Number(seasonTotalsRS[0].rowSet[0][1].toString().substring(0,4));
            seasonTotalsRS[0].rowSet.forEach((season,i)=>{
                seasons.push(season[1]);
                points.push(Number((Number(season[26])/Number(season[6])).toFixed(2)));
                rebounds.push(Number((Number(season[20])/Number(season[6])).toFixed(2)));
                assists.push(Number((Number(season[21])/Number(season[6])).toFixed(2)));            
            });

            this.setState(prevState=>({  
            options: {...prevState.options,
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
        }
      };

   

    render(){
        return(
                <div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={this.state.options}
                    />
                  </div>
        );
    }
}

export default PlayerChartComponent;