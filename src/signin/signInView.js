import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();


export default class SignInView extends Component {
    constructor(){
      super();
      const params = this.getHashParams();
      const token = params.access_token;
      if (token) {
        spotifyApi.setAccessToken(token);
      }
      this.state = {
        loggedIn: token ? true : false,
        nowPlaying: { name: 'Not Checked', albumArt: '' }
      }
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" }
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }

    render() {
      return (
        <div className="App">
          <a href='http://localhost:8888'> Login to Spotify </a>
          <div>
            Now Playing: { this.state.nowPlaying.name }
          </div>
          <div>
            <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt = ""/>
          </div>
          { this.state.loggedIn &&
            <button onClick={ () => this.getNowPlaying()}>
              Check Now Playing
            </button>
          }
        </div>
        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}
      </div>
    );
  }
}
