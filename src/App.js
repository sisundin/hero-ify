import React from 'react';
import './App.css';
import model from './modelconfig.js'
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
                  <Route path="/" render={() => <WelcomeScreen model={dinnerModel}/>}/>
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
