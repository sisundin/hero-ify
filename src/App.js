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
import ShowPlaylist from './playlistcreator/showPlaylist.js'
import ChooseLength from './playlistcreator/selevtLength'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.heromodel = HeroIfyModel;
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
          <Route exact path="/" render={() => <SignInView model={this.heromodel}/>}/>
          </div>
          <div id="choosehero">
          <Route path="/choosehero" render={() => <ChooseHero model={this.heromodel}/>}/>
          </div>
          <div id="othersplaylists">
          <Route path="/othersplaylists" render={() => <LatestPlaylist model={this.heromodel}/>}/>
          </div>
          <div id="chooseMood">
          <Route path="/chooseMood" render={() => <ChooseMood model={this.heromodel}/>}/>
          </div>
          <div id="chooseEnergy">
          <Route path="/chooseEnergy" render={() => <ChooseEnergy model={this.heromodel}/>}/>
          </div>
          <div id="showPlaylist">
          <Route path="/showPlaylist" render={() => <ShowPlaylist model={this.heromodel}/>}/>
          </div>
          <div id="chooseLength">
          <Route path="/chooseLength" render={() => <ChooseLength model={this.heromodel}/>}/>
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
