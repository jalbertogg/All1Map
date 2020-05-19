import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { hot } from 'react-hot-loader/root'
import * as d3 from 'd3'
import * as topojson from 'topojson-client';
import * as versor from 'versor'
import LAND50m from '../../../datasets/land-50m.json'
import LAND110m from '../../../datasets/land-110m.json'
import styles from '../../../theme'

const WorldGlobe3D = (props) => {

  useEffect(() => {

    const width = props.width;
    const sphere = ({type: "Sphere"});
    const projection = d3["geoOrthographic"]().precision(0.1);

    function getheight() {
       const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
       const dy = Math.ceil(y1 - y0);
       const l = Math.min(Math.ceil(x1 - x0), dy);
       projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
       return dy;
    }
    const height = getheight();

    function drag(projection) {
       let v0, q0, r0;

       function dragstarted() {
           v0 = versor.cartesian(projection.invert([d3.event.x, d3.event.y]));
           q0 = versor(r0 = projection.rotate());
       }

       function dragged() {
           const v1 = versor.cartesian(projection.rotate(r0).invert([d3.event.x, d3.event.y]));
           const q1 = versor.multiply(q0, versor.delta(v0, v1));
           projection.rotate(versor.rotation(q1));
       }

       return d3.drag()
           .on("start", dragstarted)
           .on("drag", dragged);
    }

    async function init() {
      var canvas = document.getElementById("world-globe-3d");
      var context = canvas.getContext("2d");
      const path = d3.geoPath(projection, context);

      //Set Canvas dimensions
      canvas.width = width;
      canvas.height = height;

      //Load Lands
      const world110m = await d3.json(LAND110m);
      const land110 = topojson.feature(world110m, world110m.objects.land);
      const world50m = (props.quality === 'LowFi') ? '' : await d3.json(LAND50m); //Do not waste time loading data to not be used
      const land50 = (props.quality === 'LowFi') ? '' : topojson.feature(world50m, world50m.objects.land);

      // Add gradient color with three color stops
      var gradient = context.createLinearGradient(width/2, 0, width/2, height);
      gradient.addColorStop(0, styles.all1mapCyan50);
      gradient.addColorStop(.5, styles.all1mapYellow50);
      gradient.addColorStop(1, styles.all1mapPink50);

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

      //assign drag methods to canvas
      d3.select(context.canvas)
        .call(drag(projection)
          .on("drag.render", () => render(land110))
          .on("end.render", () => (props.quality === 'LowFi') ? render(land110) : render(land50)))
        .call(() => (props.quality === 'LowFi') ? render(land110) : render(land50))
        .node();

    };

    init();

  }, []);

  return (
    <>
    <canvas id="world-globe-3d"></canvas>
    </>
  )
}


WorldGlobe3D.propTypes = {
  quality: PropTypes.oneOf(['LowFi', 'HiFi']).isRequired,
  isMoving: PropTypes.bool,
  width: PropTypes.number.isRequired
}


export default hot(WorldGlobe3D);
