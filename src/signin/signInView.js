import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';

const spotifyApi = new Spotify()
const h = React.createElement

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
      <div className='intro'>
        <div class='centered' id="intro">
          <h1 class="text-center"> Heroify</h1>
          <p> Get a playlist based on the super hero you want to be and the music you love</p>
          <div class="text-center">
            {<Button variant="btn btn-success btn-lg" class="btn btn-success btn-lrg">
              <a class = "white" href='http://localhost:8888/login'> LET'S START </a>
            </Button>}
          </div>
        </div>
      </div>
    )
  }
}
