import React from "react";
import "./App.css";
import HeroIfyModel from "./modelandconfig/model.js";
import signInView from "./signin/signInView.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <React.Fragment></React.Fragment>
          <div className="main">
            <div className="Welcome debug">
              <Route
                path="/"
                render={() => <signInView model={HeroIfyModel} />}
              />
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
