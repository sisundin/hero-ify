import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';

import ChooseHero from '../choosehero/chooseHero'
const spotifyApi = new Spotify()
const h = React.createElement

export default class SignInView extends Component {
  constructor (params) {
    super(params)
    const token = this.getHashParams().access_token
    if (token) {
      spotifyApi.setAccessToken(token)
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      topTracks: []
    }
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
      <div className='App'>
        <div id='loggedout'>
        {!this.state.loggedIn && <Button variant="outline-primary" class="btn btn-secondary">
            <a href='http://localhost:8888'> Login to Spotify </a>
          </Button>}
          
          {this.state.loggedIn &&
            <Link to="/choosehero"> 
              <Button variant='secondary' class="next" onClick={() =>{ 
                document.getElementById("home").classList.add('hide');
                }}>
                  NEXT 
              </Button>
            </Link>       
          }

          <p> You are logged in!</p>
          <p>Click NEXT to choose your hero</p>
        </div>
        <div>
      </div>
        <div className='App hide' id='loggedin'>
        You are now logged in click next to choose your super hero
        </div>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        <div>
          {this.state.loggedIn &&
            <Button variant='primary' onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </Button>
          }
          {this.state.loggedIn && <p> (Play a song on Spotify and press the button) </p>}
        </div>

        <div>
          {this.state.loggedIn &&
            <Button variant='outline-dark mr-1' onClick={() => this.getMyTopTracks()}>
              Click here see your recent top tracks
            </Button>}
        </div>
        <div>
          {this.state.loggedIn && <p> Recent top tracks: {this.state.topTracks.map(track => h('ul', {}, h('li', {id: 'list'}, track.name)))} </p>}
        </div>
      </div>
    )
  }
}
