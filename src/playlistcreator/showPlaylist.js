import React from "react";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroDisplay from "../components/createHeroDisplay.js";
import RenderPromise from "../util/renderPlaylistcreation.js";
import RenderOtherPlaylistsbutton from "../components/othersplaylists/showOtherPlaylists";

export default class ShowPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.CheckifPlaylistIsAllreadyCreated.bind(this);
    this.createdPlaylistcontainor.bind(this);
    this.state = {};
  }

  render() {
    let dataold = this.props.model.getoldplaylistdata();
    
    let newplaylist = true; 
    const name = this.props.model.getHeroName();
    const playlistattributes = this.props.model.getPlaylistAttributes();
    const allreadyCreatedName = this.props.model.getOldPlaylistName();
    const allreadyCreatedPlaylistattributes = this.props.model.getOldPlaylistAttributes();
    if( (name === allreadyCreatedName) && (playlistattributes.mood === allreadyCreatedPlaylistattributes.mood) && (playlistattributes.energy === allreadyCreatedPlaylistattributes.energy)){
      newplaylist = false;
      
      }
    else{
      newplaylist = true;  
      
        }
    return (
      <div className="outsideDiv">
        <ProgressBar step={"5"} />
        <p className="vjueHeader"> Your playlist</p>
        <HeroDisplay hero={this.props.model.getHero()} />
        <div className="divider"></div>
        <div className="text-center">
          <this.CheckifPlaylistIsAllreadyCreated playlistcheck = {newplaylist} oldData ={dataold} model= {this.props.model} functions = {this}/>
          <div className="divider"></div>
          <RenderOtherPlaylistsbutton model = {this.props.model}/>
          <div className="divider"></div>
          <Link to="/chooseHero">
            <Button className="button" variant="btn btn-warning btn-lg" onClick={() => {}}>
              {" "}
              Create new playlist
            </Button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }

  CheckifPlaylistIsAllreadyCreated(props){
    
    let data = props.oldData;
    let playlistcheck =  props.playlistcheck;
    if(playlistcheck === true){
      return <RenderPromise
      promise={props.model.createHeroPlaylist()}
      renderData={() => props.functions.createdPlaylistcontainor(props.model)}
    />
    }
    else{
      return (<div>
      <p className="copy">
      Congratulations! This is {data.name}. Check it out through the link below!
      </p>
      <Button className="button" variant="btn btn-warning btn-lg" href={data.external_urls.spotify} target="_blank" >Link to your playlist</Button>
      </div>);
       
    }
  }

  createdPlaylistcontainor(model) {
    let data = model.getGeneratedPlaylist();
    return <div>
    <p className="copy">
    Congratulations! This is {data.name}. Check it out through the link below!
    </p>
    <Button className="button" variant="btn btn-warning btn-lg" href={data.external_urls.spotify} target="_blank" >Link to your playlist</Button>
    </div>
  }

 
}