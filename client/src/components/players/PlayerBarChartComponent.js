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
            let statText = "";
            seasonHighs[0].rowSet.forEach((season,i)=>{ 
                switch(season[7]){
                    case "PTS":
                        if(points===""){
                            statText="Points";                        
                            points = season[8];
                        }
                        break;
                    case "AST":
                        if(assists===""){
                            statText="Assists";
                            assists = season[8];
                        }
                        break;
                    case "REB":
                        if(rebounds===""){
                            statText="Rebounds";
                            rebounds = season[8];
                        }
                        break;
                    case "STL":
                        if(steals===""){
                            statText="Steals";
                            steals = season[8];
                        }
                        break;
                    case "BLK":
                        if(blocks===""){
                            statText="Blocks";
                            blocks = season[8];
                        }
                        break;
                    default:
                        break;
                }            
                texts.push(`${statText}<br/>(${season[2]}<br/> vs. ${season[4]} ${season[5]})`);
            
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