import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import d3 from './d3'
import './styles'
import Unemployment from '../../../datasets/unemployment.tsv'

function LineChartDemo(props){

  const init = async () => {
    const svg = d3.select('#' + props.id);
    const height = svg.node().parentElement.clientHeight; //set to svg container height
    const width = svg.node().parentElement.clientWidth; //set svg container width
    const margin = ({top: 20, right: 20, bottom: 30, left: 30});
    var data = [];

    //Generate data and modify it over the time
    const gendata = (dataset) => {
      let data = dataset;
      let values = [];

      if (dataset.length === 0){ //generate the initial series of data from 0 to 100;
        for(let x=0; (x<props.nseries) ; ++x){
          values = Array.from({length: props.nvalues}, () => Math.floor(Math.random() * 100));
          data.push({serie: x, values: values})
        }
      }

      return data;
    };

    //Generate domains and line function
    const genchart = (dataset) => {
      let x = d3.scaleLinear()
        .domain([0,props.nvalues-1])
        .range([margin.left, width - margin.right])

      let y = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d3.max(d.values))]).nice()
        .range([height - margin.bottom, margin.top])

      let line = d3.line()
        .defined(d => !isNaN(d))
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveBasis)

      return [x,y,line];
    }

    //Draw chart function
    const drawchart = (methods,data) => {
      let x = methods[0];
      let y = methods[1];
      let line = methods[2];

      svg.attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible");

      const path = svg.append("g")
        .selectAll("path")
        .data(data)
        .join("path")
          .attr("d", d => line(d.values))
          .attr("class",(d,i) => "line-" + i)
    }

    data = gendata(data);
    drawchart(genchart(data),data);

  }


  useEffect(() => {
    init();
  }, []);


  return <svg className="linechart-demo" id={props.id}/>
}

export default hot(LineChartDemo);


LineChartDemo.propTypes = {
  id: PropTypes.string.isRequired,
  nseries: PropTypes.number.isRequired,
  nvalues: PropTypes.number.isRequired,
}

LineChartDemo.defaultProps = {
  id: 'linechart',
  nseries: 3,
  nvalues: 10,
}
