import React from "react";
import ProgressBar from "../HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import LatestPlaylist from "../othersplaylists/allPlaylistsCreated.js";

export default class ShowPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.playlist = this.props.model.createHeroPlaylist();
    console.log(this.playlist)
  }

  render() {
    const wrapperStyle = { width: 400, margin: 50 };

            return (<div className="outsideDiv">
            <ProgressBar step={"5"}/>
            <p className="vjueHeader"> YOUR PLAYLIST</p>
            <div className="Herocard">
          <div className="divider"></div>
            <img className = "heroPic" src={this.props.model.getHeroImage()} alt="img"></img>
            <div className="divider"></div></div>
            <div style={wrapperStyle} className="divider"></div>
            <p className="copy"> 
            Congratulations! This is {this.props.model.getHeroName()}'s perfect Spotify playlist. Listen to it and dream of saving the world!</p>
            <p className="copy">Share it with your friends, or create a new one. A hero never runs out
            of missions!
            </p>
            <div className="divider"></div>
            <div className="tablecentering">
            <LatestPlaylist model = {this.props.model}/>
            <div className="divider"></div>
            </div>
            <div className="divider"></div>
            <div class="text-center">
            <Link to="/chooseHero"><Button variant="btn btn-success btn-lg" onClick={()=>{
                }} > CREATE NEW PLAYLIST</Button></Link>
            </div>
            </div>
        )
    }
}
