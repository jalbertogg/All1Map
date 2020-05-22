import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import d3 from './d3'
import './styles'

function LineChartDemo(props){

  const init = async () => {
    const svg = d3.select('#' + props.id),
          margin = ({top: props.margin[0], right: props.margin[1], bottom: props.margin[2], left: props.margin[3]}),
          width = svg.node().parentElement.clientWidth - margin.left - margin.right,
          height = svg.node().parentElement.clientHeight - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var random100 = d3.randomInt(0,100),
        random10 = d3.randomInt(0,10);

    svg.attr("width", svg.node().parentElement.clientWidth)
      .attr("height", svg.node().parentElement.clientHeight);

    //generate the initial series of data from 0 to 100;
    const createDataset = () => {
      let data = [];
      let values = [];
      for(let x=0; (x<props.nseries) ; ++x){
        values = d3.range(props.nvalues+1).map(random100);
        //values[0] = 50; //first point in the middle for all series
        data.push({serie: x, values: values})
      }
      return data;
    }

    //Modify data array in a range of 0-gap% value
    const updateValues = (values) => {
      let i, v;
      let n_values = [];

      n_values = values.map(d => {
        i = random10();
        if(i >= 4){
          v = d * (1 + Math.floor(Math.random()*props.gap)/100); //increments value
          if (v > 100) v=100; //set the limit of max value to 100 to avoid scale so much
        }else{
          v = d * (1 - Math.floor(Math.random()*props.gap)/100); //decrements value
        }
        return v
      });

      //n_values[0] = 50;
      return n_values;
    };


    //Draw chart function
    const drawchart = () => {
      var data = createDataset();

      let x = d3.scaleLinear()
        .domain([0, props.nvalues-1])
        .range([0, width])

      let y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])

      let line = d3.line()
        .defined(d => !isNaN(d))
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveBasis)


      g.append("defs").append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height);

      g.append("g")
          .attr("clip-path", "url(#clip)")
        .selectAll("path")
        .data(data)
        .join("path")
          .attr("d", d => line(d.values))
          .attr("class",(d,i) => "line-" + i)
        .transition()
          .duration(props.vel)
          .on("start", tick);

      function tick() {

        //Update value
        if(!props.isMoving){
          d3.active(this)
            .attr("d", d => line(updateValues(d.values)))
            .transition()
              .ease(d3.easeQuadInOut)
              .on("start", tick);
        }else{

          d3.select(this)
            .data()[0]
            .values.unshift(random100());

          d3.select(this)
            .attr("d", d => line(d.values))
            .attr("transform", null);

          d3.active(this)
              .attr("transform", "translate(" + x(+1) + ",0)")
            .transition()
              .ease(d3.easeLinear)
              .on("start", tick);

          d3.select(this)
            .data()[0]
            .values.pop();
        }
      }

    }

    drawchart();
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
  gap: PropTypes.number,
  isMoving: PropTypes.bool,
  margin: PropTypes.array
}

LineChartDemo.defaultProps = {
  id: 'linechart',
  nseries: 1,
  nvalues: 10,
  gap: 40,
  vel: 1000,
  isMoving: true,
  margin: [24,24,24,24]
}
