import React,{Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class PlayerBarChartComponent extends Component{

    state={
        options: {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Career highs'
            },
            xAxis: {
                categories: ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks']
            },
            yAxis: {
                min: 0,
                title: {
                    text: '#'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: '',
                data: [61, 3, 4, 7, 2]
            }]
        }
    }

    
    componentDidMount(){
        this.filterData(this.props.data,this.props.statType);
      }

      filterData = async (dat,statName)=>{
            //TODO check undefined??
          if(typeof(dat.resultSets)!=="undefined"){
            let seasonHighs = dat.resultSets.filter( function (el) {
                return el.name === statName;
            });

            let highs = [];
            let texts = [];
            texts.push(`Points<br/>(${seasonHighs[0].rowSet[0][2]}<br/> vs. ${seasonHighs[0].rowSet[0][4]}${seasonHighs[0].rowSet[0][5]})`)
            highs.push(seasonHighs[0].rowSet[0][8]);

            seasonHighs[0].rowSet.forEach((season,i)=>{
                if(season[])
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

export default PlayerBarChartComponent;