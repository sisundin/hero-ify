import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button } from 'react-bootstrap'
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
        <div class='centered' id="intro">
          <div class="divimg"> 
            <img class="img" alt="no_image_found" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f359881d-6bb2-4391-aba6-779f7084edd4/db9vwnm-3059d04e-eeea-464e-8bcd-101fa4274069.png/v1/fill/w_1024,h_1518,strp/spider_man___transparent_by_asthonx1_db9vwnm-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUxOCIsInBhdGgiOiJcL2ZcL2YzNTk4ODFkLTZiYjItNDM5MS1hYmE2LTc3OWY3MDg0ZWRkNFwvZGI5dndubS0zMDU5ZDA0ZS1lZWVhLTQ2NGUtOGJjZC0xMDFmYTQyNzQwNjkucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.YO_aZfKxp_Fj5j5eZCXpE67pP2BGDMfPMw96DT9D2aA"></img>
          </div>
          <h1 class="text-center"> Hero-ify</h1>
          <div class="text-center p"> 
            <p>A hero needs a soundtrack when they are heading out on a mission to save the world.</p>
            <br></br>
            <p>Pick your hero, set the mood and find out what Spiderman, Wonderwoman or Harry Potter would have in their
            headphones when rescuing humankind from a terrible fate. Enjoy the results in a customized Spotiy playlist!</p>
          </div>
          <div class="text-center">
            {<Button variant="btn btn-success btn-lg" class="btn btn-success btn-lrg">
              <a class = "white" href='http://localhost:8888/login'> LET'S START </a>
            </Button>}
          </div>
          <div className="divider"></div>
        </div>
      </div>
      )
  }
}
