import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button } from 'react-bootstrap'
import ProgressBar from "../components/HeaderAndFooter/header.js";
import logo from "../Assets/logo@300x.png"
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
          <div className="divider"></div>
          <div className="center"><img className="heroify-logo-large" src={logo}></img></div>
            <p className="center">A hero needs a soundtrack when they are heading out on a
            <br/>mission to save the world.</p>
            <p className="center">Hero-ify let's you pick a hero, set the mood and find out what
            <br/>Spiderman, Wonderwoman, Harry Potter or any other hero out there would
            <br/>have in their headphones when rescuing humankind from a terrible fate. 
            <br/>
            <br/>Enjoy the results in a customized Spotify playlist!</p>
            <div className="divider"></div>
          <div class="text-center">
            <Button className="button" variant="btn btn-warning btn-lg" class="btn btn-warning btn-lrg">
              <a class = "white" href='https://hero-auth.herokuapp.com/login'>Start</a>
            </Button>
          </div>
          <div className="divider"></div>
          <div className="divider"></div>
      </div>
      )
  }
}
