import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button } from 'react-bootstrap'
const spotifyApi = new Spotify()

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
      recenttracks: { artist: '', track: '' }
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

  getRecentlyPlayed () {
    spotifyApi.getMyTopTracks().then((response) => {
      this.setState({
        recenttracks: {
          track: response.type.tracks.name
        }
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <Button variant="outline-primary">
          <a href='http://localhost:8888'> Login to Spotify </a>
        </Button>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn &&
          <Button variant='success' onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </Button>}
        <p>
            What are your listetning to right now? =O
        </p>
        <div>
          Recent tracks: {this.state.recenttracks.tracks}
        </div>
        <Button variant='outline-dark' onClick={() => this.getRecentlyPlayed()}>
          Click here see your recenetly played tracks
        </Button>
        
      </div>
    )
  }s
}