import "./styles"
import "./global"
import React from 'react'
import ReactDOM from 'react-dom'
import './js/polyfills'
import { useTheme } from "./js/useTheme";
import GlobalHeader from './components/GlobalHeader'
import BigFooter from './components/BigFooter'
import App from './pages/home'
// import App from './pages/Theme_test/theme_page'

const Page = () => {
  const [theme, toggleTheme, componentMounted] = useTheme();

  if(!componentMounted){
    return <div />
  }

  return ([
      <GlobalHeader theme={theme} toggleTheme={toggleTheme}/>,
      <App />,
      <BigFooter />
  ]);

}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)
