import React,{Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class PlayerColumnChartComponent extends Component{

    state={
        options: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Browser<br>shares<br>2017',
                align: 'center',
                verticalAlign: 'middle',
                y: 40
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%'],
                    size: '110%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '50%',
                data: [
                    ['Chrome', 58.9],
                    ['Firefox', 13.29],
                    ['Internet Explorer', 13],
                    ['Edge', 3.78],
                    ['Safari', 3.42],
                    {
                        name: 'Other',
                        y: 7.61,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
        }
    }

    
    // componentDidMount(){
    //     console.log("da");
    //         this.getPlayerStats()
    //       .then(res => {
    //           this.filterData(res,this.props.statType);
    //     })
    //       .catch(err => console.log(err));
    //   }

      filterData = async (res,statName)=>{
            //TODO check undefined??
          if(typeof(res.resultSets)!=="undefined"){
            let seasonTotalsRS = res.resultSets.filter( function (el) {
                return el.name === statName;
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

    getPlayerStats = async () => {
        const response = await fetch('/api/playerStats/' + this.props.playerId);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
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

export default PlayerColumnChartComponent;