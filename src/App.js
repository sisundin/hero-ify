import React from 'react'
import './App.css'
import HeroIfyModel from './modelandconfig/model.js'
import SignInView from './signin/signInView.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import LatestPlaylist from './othersplaylists/allPlaylistsCreated.js'
import ChooseHero from './choosehero/chooseHero.js'

import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import heroifyModel from './modelandconfig/model.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    HeroIfyModel.searchHero("ironman");
    this.state = {
    }
    HeroIfyModel.addYourplaylistToDatabase("test2", "test2", "test2");
  }

  render () {
    return (
      <Router>
        <Switch>
          <div>
            <SignInView model={HeroIfyModel}/>
            <ChooseHero model={heroifyModel}/>
          </div>
        </Switch>
      </Router>
    )
  }
}

export default App
