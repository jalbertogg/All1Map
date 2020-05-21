import './styles'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import LineChart from '../../components/viz/LineChartDemo'

const Tests = () => {
  return (
    <div className="linechart-container">
      <LineChart

      />
    </div>
  );
}

export default hot(Tests);
