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
                data: []
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

            let texts = [];
            let points = "";
            let assists = "";
            let rebounds = "";
            let steals = "";
            let blocks = "";

            seasonHighs[0].rowSet.forEach((season,i)=>{ 
            switch(season[7]){
                case "PTS":
                    if(points===""){
                        texts.push(`Points<br/>(${season[2]}<br/> vs. ${season[4]} ${season[5]})`);
                        points = season[8];
                    }
                    break;
                case "AST":
                    if(assists===""){
                        texts.push(`Assists<br/>(${season[2]}<br/> vs. ${season[4]} ${season[5]})`);
                        assists = season[8];
                    }
                    break;
                case "REB":
                    if(rebounds===""){
                        texts.push(`Rebounds<br/>(${season[2]}<br/> vs. ${season[4]} ${season[5]})`);
                        rebounds = season[8];
                    }
                    break;
                case "STL":
                    if(steals===""){
                        texts.push(`Steals<br/>(${season[2]}<br/> vs. ${season[4]} ${season[5]})`);
                        steals = season[8];
                    }
                    break;
                case "BLK":
                    if(blocks===""){
                        texts.push(`Blocks<br/>(${season[2]}<br/> vs. ${season[4]} ${season[5]})`);
                        blocks = season[8];
                    }
                    break;
                default:
                    break;
            }            
            
            });

            this.setState(prevState=>({  
            options: {...prevState.options,   
                xAxis: {
                    categories: texts
                },         
                series: [{
                    name: '',
                    data: [points, rebounds, assists, steals, blocks]
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