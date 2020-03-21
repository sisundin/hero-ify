import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button } from 'react-bootstrap'
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
        <div>
          {this.state.loggedIn &&
            <Button variant='primary mr-1' onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </Button>}
          <p> (Play a song on Spotify and press the button) </p>
        </div>
        <div>
          {this.state.loggedIn &&
            <Button variant='outline-dark mr-1' onClick={() => this.getMyTopTracks()}>
              Click here see your recent top tracks
            </Button>}
        </div>
        <div>
          Recent top tracks: {this.state.topTracks.map(track => h('ul', {}, h('li', {id: 'list'}, track.name)))}
        </div>

      </div>
    )
  }
}
