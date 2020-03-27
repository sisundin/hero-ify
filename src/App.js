import React from 'react'
import './App.css'
import HeroIfyModel from './modelandconfig/model.js'
import Footer from './HeaderAndFooter/footer.js'
import SignInView from './signin/signInView.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChooseHero from './choosehero/chooseHero'
import LatestPlaylist from './othersplaylists/allPlaylistsCreated.js'
//import PlaylistSettings from './playlistcreator/specYourPlaylist';
import ChooseMood from './playlistcreator/selectMood.js'
import ChooseEnergy from './playlistcreator/selectenergylevel.js'

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
    return (<div className="flexparent">
      <div className="background">
      
      <Router>
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
          <div id="chooseMood">
          <Route path="/chooseMood" render={() => <ChooseMood model={heroifyModel}/>}/>
          </div>
          <div id="chooseMood">
          <Route path="/chooseEnergy" render={() => <ChooseEnergy model={heroifyModel}/>}/>
          </div>
        </React.Fragment>
        </Switch>
        <div id="wavecontainor"></div>
      </Router>
      
      <Footer/>
      
      </div>
      
      </div>
      
    )
  }
  //<Route path="/specPlaylist" render={() => <playlistSettings model={heroifyModel}/>}/>
}

export default App
