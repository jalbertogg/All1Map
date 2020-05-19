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
    const d3 = require("d3-geo");
    const d3g = require("d3");
    const width = props.width;
    const height = props.width;
    const sphere = {type: "Sphere"};
    const land = topojson.feature(await d3g.json(LAND110m), "land");

    //Set Canvas
    var canvas = document.getElementById("world-globe-3d");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    const figure = d3g.select(canvas);

    const projection = d3.geoOrthographic().fitExtent([[1, 1], [width - 1, height - 1]], sphere);
    const path = d3.geoPath(projection, context);

    for (let x = 0; true; ++x) {
      projection.rotate([x / 10, 0, 0]);
      context.clearRect(0, 0, width, height);
      context.beginPath(), path(land), context.fill();
      context.beginPath(), path(sphere), context.stroke();
      yield figure;
      await visibility();
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
    <canvas id="world-globe-3d"></canvas>
    </>
  )
}


WorldGlobe3D.propTypes = {
  quality: PropTypes.oneOf(['LowFi', 'HiFi']).isRequired,
  isMoving: PropTypes.boolean,
  width: PropTypes.number.isRequired
}


export default hot(WorldGlobe3D);
