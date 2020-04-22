import './global'
import './index-page'
import React from 'react'
import ReactDOM from 'react-dom'
import './js/polyfills'
import { Content } from "carbon-components-react/es/components/UIShell";
import GlobalHeader from './components/GlobalHeader'
import HeaderTitleImage from './components/HeaderTitleImage'

export class Home extends React.Component {
  render(){
    return ([
      <GlobalHeader />,
      <div className="bx--grid bx--grid--full-width landing-page">
        <HeaderTitleImage />
      </div>
    ]);
  }
};


ReactDOM.render(
  <Home />,
  document.getElementById('root')
)
