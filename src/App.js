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
import ProgressBar from './HeaderAndFooter/header.js';
import {Link} from 'react-router-dom';
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
    
  };
    //HeroIfyModel.addYourplaylistToDatabase("test10", "tes10","test10")
    //HeroIfyModel.getOthersPlaylistsfromdatabase(7);
  

  render () {
    return (
      <div className="body">
        <div className="background">
      </div>
      <Router >
          <Switch>
            <React.Fragment>
              <div id="home">
                <Route exact path="/" render={() => <SignInView model={this.heromodel}/>}/>
              </div>
              <div id="choosehero">
                <Route path="/choosehero" render={() => <ChooseHero model={this.heromodel}/>}/>
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
            
              <div className="divider"></div>
          </React.Fragment>
        </Switch>
        
        <div id="wavecontainor"><Footer/></div>
      </Router>
      
      </div>
      
      
    )
  }
  //<Route path="/specPlaylist" render={() => <playlistSettings model={heroifyModel}/>}/>
}

const NoMatch = () => (
  <div className="outsideDiv">
    <ProgressBar step={"0"}/>
  <div className="centered">
    <h1>404 No match</h1> 
    <Link to='/'>
      <h1>Click here to go to homepage</h1>
    </Link>
    </div>
    </div>
  
)



export default App



