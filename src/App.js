import React from 'react';
import './App.css';
import HeroIfyModel from './modelandconfig/model.js';
import SignInView from './signin/signInView.js';
import {BrowserRouter as Router, Switch , Route} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props)
    HeroIfyModel.searchHero("batman");
    this.state = {
    }
  }


  render() {
    return (
      <Router>
          <Switch>
            <React.Fragment></React.Fragment>
              <div className = "main">
                <div className = "Welcome debug">
                  <Route path="/" render={() => <SignInView/>}/>
              </div>
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
    //    </div> model={HeroIfyModel}
