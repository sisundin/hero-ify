import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button } from 'react-bootstrap'
import ProgressBar from "../HeaderAndFooter/header.js";
const spotifyApi = new Spotify()

export default class SignInView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topTracks: this.props.model.getMyTopTracks()
    }

    this.update = this.update.bind(this);
  }

  getHashParams () {
    var hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams
  }

  update() {
    this.setState({
    })
}


componentDidMount() {
    this.props.model.addObserver(() => this.update());
    
  }
 
componentWillUnmount() {
    this.props.model.removeObserver(this)
  }


  getNowPlaying () {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      })
    })
  }

  getMyTopTracks () {
    var alltrackstoptracks = []
    spotifyApi.getMyTopTracks({ limit: 100 }).then(response => {
      for (var i = 0, l = response.items.length; i < l; i++) {
        alltrackstoptracks.push(response.items[i])
      }
      this.setState({
        topTracks: alltrackstoptracks
      })
    })
  }

  hideAllResponses () {
    if (this.state.loggedIn === true) {
      document.getElementById("loggedout").classList.add('hide')
      document.getElementById("loggedin").classList.remove('hide')
    }
  }

  render () {
    return (
      <div className="outsideDiv">
        <ProgressBar step={"0"}/>
        
          <div className="Herocard">
          <div className="divider"></div>
            <h1>Hero-ify</h1>
            <p className="center">A hero needs a soundtrack when they are heading out on a mission to save the world.</p>
            <p className="center">Pick your hero, set the mood and find out what Spiderman, Wonderwoman or Harry Potter would have in their
            headphones when rescuing humankind from a terrible fate. Enjoy the results in a customized Spotiy playlist!</p>
            <div className="divider"></div>
            </div>
            <div className="divider"></div>
          <div class="text-center">
            <Button variant="btn btn-success btn-lg" class="btn btn-success btn-lrg">
              <a class = "white" href='http://localhost:8888/login'> LET'S SAVE THE PLANET </a>
            </Button>
          </div>
          <div className="divider"></div>
      </div>
      )
  }
}
