import React from "react";
import "./App.css";
import HeroIfyModel from "./modelandconfig/model.js";
import Footer from "./components/HeaderAndFooter/footer.js";
import SignInView from "./signin/signInView.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ChooseHero from "./choosehero/chooseHero";
import ChooseMood from "./playlistcreator/selectMood.js";
import ChooseEnergy from "./playlistcreator/selectEnergy";
import ChooseLength from "./playlistcreator/selectLength.js";
import ShowPlaylist from "./playlistcreator/showPlaylist.js";
import ProgressBar from "./components/HeaderAndFooter/header.js";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.heromodel = HeroIfyModel;
    //HeroIfyModel.searchHero("ironman");
    this.state = {};
  }
  //HeroIfyModel.addYourplaylistToDatabase("test10", "tes10","test10")
  //HeroIfyModel.getOthersPlaylistsfromdatabase(7);

  render() {
    return (
      <div className="body">
        <div className="background"></div>
        <Router>
          <React.Fragment>
            <Switch>
              <Route
                path="/"
                exact
                component={() => <SignInView model={this.heromodel} />}
              />
              <Route
                path="/choosehero"
                component={() => <ChooseHero model={this.heromodel} />}
              />
              <Route
                path="/chooseMood"
                component={() => <ChooseMood model={this.heromodel} />}
              />
              <Route
                path="/chooseEnergy"
                component={() => <ChooseEnergy model={this.heromodel} />}
              />
              <Route
                path="/chooseLength"
                component={() => <ChooseLength model={this.heromodel} />}
              />
              <Route
                path="/showPlaylist"
                component={() => <ShowPlaylist model={this.heromodel} />}
              />

              <Route component={NoMatch} />
              <div className="divider"></div>
            </Switch>
            <div id="wavecontainor">
              <Footer />
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }
  //<Route path="/specPlaylist" render={() => <playlistSettings model={heroifyModel}/>}/>
}

const NoMatch = () => (
  <div className="outsideDiv">
    <ProgressBar step={"0"} />
    <div className="centered">
      <h1>404 No match</h1>
      <Link to="/">
        <h1>Click here to go to homepage</h1>
      </Link>
    </div>
  </div>
);

export default App;
