import React from 'react';
import './App.css';
import HeroIfyModel from './modelandconfig/model.js';
import SignInView from './signin/signInView.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  } 

  render(){
    return (
      <Router>
          <Switch>
              <div>
                <SignInView model={HeroIfyModel}/>
              </div>
          </Switch>
      </Router>
    );
 
  }
}

export default App;
