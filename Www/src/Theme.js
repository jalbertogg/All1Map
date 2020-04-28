// import './styles'
import React from 'react'
import ReactDOM from 'react-dom'
import '../../js/polyfills'
import GlobalHeader from '../../components/GlobalHeader'
import { Content } from "carbon-components-react/es/components/UIShell";
import BigFooter from '../../components/BigFooter'
import App from './pages/Theme_test/theme_page'
import './styles'

const page = [
      <GlobalHeader />,
      <App />,
      <BigFooter />
    ];


ReactDOM.render(
  page,
  document.getElementById('root')
)
