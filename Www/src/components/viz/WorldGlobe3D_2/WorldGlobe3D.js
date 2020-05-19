import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { hot } from 'react-hot-loader/root'
import {Runtime, Inspector} from "@observablehq/runtime";
import * as versor from 'versor'
import LAND50m from '../../../datasets/land-50m.json'
import LAND110m from '../../../datasets/land-110m.json'
import styles from '../../../theme'

const WorldGlobe3D = (props) => {

  function define(runtime, observer) {
    const main = runtime.module();

    main.variable(observer()).define(["DOM","html","visibility"], async function*(DOM,html,visibility)
  {
    const topojson = require("topojson-client");
    const d3geo = require("d3-geo");
    const d3 = require("d3");
    const width = props.width;
    const sphere = {type: "Sphere"};
    const land110 = topojson.feature(await d3.json(LAND110m), "land");
    const land50 = (props.quality === 'LowFi') ? '' : topojson.feature(await d3.json(LAND50m), "land");//Do not waste time loading data to not be used
    const projection = d3geo.geoOrthographic().fitExtent([[1, 1], [width - 1, height - 1]], sphere);
    var pause = false; //flag to no rotate while user interaction
    var current_rotation = [0,0,0]; //track world rotation

    //calculate height
    function getheight() {
       const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
       const dy = Math.ceil(y1 - y0);
       const l = Math.min(Math.ceil(x1 - x0), dy);
       projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
       return dy;
    }
    const height = getheight();

    //Drag interactions
    function drag(projection) {
       let v0, q0, r0;

       function dragstarted() {
           v0 = versor.cartesian(projection.invert([d3.event.x, d3.event.y]));
           q0 = versor(r0 = projection.rotate());
       }

       function dragged() {
           const v1 = versor.cartesian(projection.rotate(r0).invert([d3.event.x, d3.event.y]));
           const q1 = versor.multiply(q0, versor.delta(v0, v1));
           current_rotation = versor.rotation(q1);
           projection.rotate(current_rotation);
           console.log("DRAGGED -> current_rotation:", current_rotation);
       }

       return d3.drag()
           .on("start", dragstarted)
           .on("drag", dragged);
    }


    //render world globe
    function render(land) {
      context.clearRect(0, 0, width, height);

      context.beginPath(),
      path(sphere),
      context.fillStyle = "#000",
      context.fill();

      context.beginPath(),
      path(land),
      context.strokeStyle = gradient,
      context.stroke();
    }

    //Set Canvas
    var canvas = document.getElementById(props.id);
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    const path = d3geo.geoPath(projection, context);
    const figure = d3.select(canvas);

    // Add gradient color with three color stops
    var gradient = context.createLinearGradient(width/2, 0, width/2, height);
    gradient.addColorStop(0, styles.all1mapCyan50);
    gradient.addColorStop(.5, styles.all1mapYellow50);
    gradient.addColorStop(1, styles.all1mapPink50);

    //drag renders
    function drag_start_render(){
      render(land110);
      pause = true;
    }

    function drag_end_render(){
      (props.quality === 'LowFi') ? render(land110) : render(land50);
      pause = false;
    }

    function pause(){
      pause = !pause;
      console.log("pause: ",pause)
    }

    //draw world & assign drag methods to canvas
    d3.select(context.canvas)
      .call(drag(projection)
        .on("drag.render", () => drag_start_render())
        .on("end.render", () => drag_end_render()))
      .node();

    // d3.select(context.canvas)
    //   .on("click", () => pause())
    //   .node();


    //rotate world
    if(props.isMoving){
      let i=0;
      for (let x = 0; true ; ++x) {
        console.log(i,current_rotation);
        if(!pause) {
          projection.rotate([current_rotation[0] + i/10, current_rotation[1], current_rotation[2]]);
          render(land50);
          i=i+4;
        }else i=0;
        yield figure;
        await visibility();
      }
      console.log("rotate end")
    }


  });

    return main;
  }

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(define, Inspector.into(document.getElementById('root')));
  }, []);

  return (
    <>
    <canvas id={props.id}></canvas>
    </>
  )
}


WorldGlobe3D.propTypes = {
  id: PropTypes.string.isRequired,
  quality: PropTypes.oneOf(['LowFi','HiFi']).isRequired,
  isMoving: PropTypes.bool,
  width: PropTypes.number.isRequired
}

WorldGlobe3D.defaultProps = {
  id: 'WorldGlobe3D',
  quality: 'LowFi',
  isMoving: false,
  width:500
}


export default hot(WorldGlobe3D);
