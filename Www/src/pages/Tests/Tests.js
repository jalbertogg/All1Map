import './styles'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import LineChartDemo from '../../components/viz/LineChartDemo'
import WorldGlobe3D from '../../components/viz/WorldGlobe3D'

const Tests = () => {
  return (
    <div className="test" >
      <WorldGlobe3D
        id="world-globe-3d"
        width={355}
        quality='HiFi'
        isMoving={false}
        speed={1}
        padding={10}
        pauseOnClick = {false}
        isDraggable = {true}
        position = {[0,-20,0]}
      />
    </div>
  );
}

export default hot(Tests);
