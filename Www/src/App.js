import "./global"
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'
import { useTheme } from "./js/useTheme";
import { Content } from "carbon-components-react/es/components/UIShell";
import GlobalHeader from './components/GlobalHeader'
import Home from './pages/Home'
import Theme from './pages/Theme'
import Error from './pages/Error'

const App = () => {
  const [theme, toggleTheme, componentMounted] = useTheme();

  if(!componentMounted){
    return <div />
  }

  return (
    <>
    <GlobalHeader theme={theme} toggleTheme={toggleTheme}/>
    <Content>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/theme" component={Theme} />
          <Route component={Error} />
      </Switch>
    </Content>
    </>
  );
}

export default hot(App);
