import React from 'react'
import './App.css'
import HeroIfyModel from './modelandconfig/model.js'
import SignInView from './signin/signInView.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChooseHero from './choosehero/chooseHero'
import LatestPlaylist from './othersplaylists/allPlaylistsCreated.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Fragment
} from 'react-router-dom'
import heroifyModel from './modelandconfig/model.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    //HeroIfyModel.searchHero("ironman");
    this.state = {
    }
    //HeroIfyModel.addYourplaylistToDatabase("test10", "tes10","test10")
    //HeroIfyModel.getOthersPlaylistsfromdatabase(7);
  }

  render () {
    return (
      <Router>
        <div className="App">
        <Switch>
        <React.Fragment>
          <div id="home">
          <Route exact path="/" render={() => <SignInView model={HeroIfyModel}/>}/>
          </div>
          <div id="choosehero">
          <Route path="/choosehero" render={() => <ChooseHero model={HeroIfyModel}/>}/>
          </div>
          <div id="othersplaylists">
          <Route path="/othersplaylists" render={() => <LatestPlaylist model={heroifyModel}/>}/>
          </div>
        </React.Fragment>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App
