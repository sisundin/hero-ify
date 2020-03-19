import React from 'react';
import './App.css';
import HeroIfyModel from './modelconfig/model.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom"


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
            <React.Fragment></React.Fragment>
              <div className = "main">
                <div className = "Welcome debug" id = "search">
                  <Route path="/" render={() => <WelcomeScreen model={HeroIfyModel}/>}/>
              </div>
            </div>
          </Switch>
      </Router>
    );
 
  }
}

export default App;

//<div className = "mainContent hide debug" id="details">
  //      <DishDetailsContainer model = {dinnerModel}/>
    //    </div>
