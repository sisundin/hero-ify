import React from "react";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroDisplay from "../components/createHeroDisplay.js";
import RenderPromise from "../util/renderPlaylistcreation.js";
import RenderOtherPlaylistsbutton from "../components/showOtherPlaylists";

const h = React.createElement;

export default class ShowPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { 
    };
  }


  render() {
    const wrapperStyle = { width: 400, margin: 50 };    
    return (
      <div className="outsideDiv">
        <ProgressBar step={"5"} />
        <p className="vjueHeader"> Your playlist</p>
        <HeroDisplay hero={this.props.model.hero} />
        
        <div className="divider"></div>
        <div className="text-center">
        <RenderPromise
          promise= {this.props.model.createHeroPlaylist()}
          renderData={() => this.createdPlaylistcontainor()}
          />
          <RenderOtherPlaylistsbutton model = {this.props.model}/>
          <div className="divider"></div>
          <Link to="/chooseHero">
            <Button variant="btn btn-success btn-lg" onClick={() => {}}>
              {" "}
              CREATE NEW PLAYLIST
            </Button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }

  createdPlaylistcontainor(){
    let data = this.props.model.getGeneratedPlaylist();
    console.log("inside createdPlaylistcontainor");
    console.log(data);
    return <div>
    <p className="copy">
    Congratulations! This is {this.props.model.getHeroName()}'s perfect
    Spotify playlist {data.name}
    </p>
    <div className="divider"></div>
    <Button variant="btn btn-success btn-lg" href={data.external_urls.spotify} target="_blank" >Click here to check out your playlist</Button>
    <div className="divider"></div>
    </div>
  }
}
