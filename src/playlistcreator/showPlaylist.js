import React from "react";
import ProgressBar from "../HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RenderPlaylistCreation from '../util/renderPlaylistcreation.js'

import LatestPlaylist from "../othersplaylists/allPlaylistsCreated.js";
const h = React.createElement;

export default class ShowPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {showPlaylists: false};
  }


    togglePlaylists() {
          this.setState({
            showPlaylists: !this.state.showPlaylists
          });
        }

  render() {
    const wrapperStyle = { width: 400, margin: 50 };

            return (<div className="outsideDiv">
            <ProgressBar step={"5"}/>
            <div className="FAQ"> 
            {this.state.showPlaylists ? 
            <LatestPlaylist closePlaylists={this.togglePlaylists.bind(this)} model = {this.props.model}/>
            : null}
            </div>
            <RenderPlaylistCreation 
            exicutor = {this.props.model.createHeroPlaylist()}
            renderData={({data})=> this.createdPlaylistcontainor(data)}
            />
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
           
            
            <div class="text-center">
            <Button onClick={this.togglePlaylists.bind(this)}>Show playlsits created with Hero-ify</Button>
            <div className="divider"></div>
            <Link to="/chooseHero"><Button variant="btn btn-success btn-lg" onClick={()=>{
                }} > CREATE NEW PLAYLIST</Button></Link>
            </div>
            <div className="divider"></div>
            <div className="divider"></div>
            
            </div>
        )
    }

    createdPlaylistcontainor(playlist){
      return <Button href={playlist.href}>Click here to get to your playlist</Button>
      

    }

}
