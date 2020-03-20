import React from 'react';
import './App.css';
import HeroIfyModel from './modelandconfig/model.js';
import SignInView from './signin/signInView.js';
import LatestPlaylist from './othersplaylists/allPlaylistsCreated.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props)
    //HeroIfyModel.searchHero("ironman");
    this.state = {
    }
  }

  render(){
    return (
      <Router>
        <div>

          <LatestPlaylist model={HeroIfyModel}/>
        </div>
          <Switch>
              
              
          </Switch>
      </Router>
    );
  }
}

export default App;
