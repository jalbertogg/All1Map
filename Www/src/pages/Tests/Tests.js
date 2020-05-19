import './styles'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import WorldGlobe3D from '../../components/viz/WorldGlobe3D_2'

const Tests = () => {
  return <WorldGlobe3D id="world-globe-3d" width={500} quality='HiFi' isMoving={true}/>
}

export default hot(Tests);
