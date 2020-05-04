import React from "react";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroDisplay from "../components/createHeroDisplay.js";
import RenderPlaylistCreation from "../util/renderPlaylistcreation.js";

import LatestPlaylist from "../othersplaylists/allPlaylistsCreated.js";
const h = React.createElement;

export default class ShowPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { showPlaylists: false,
    };
  }

  togglePlaylists() {
    this.setState({
      showPlaylists: !this.state.showPlaylists,
    });
  }

  render() {
    const wrapperStyle = { width: 400, margin: 50 };    
    return (
      <div className="outsideDiv">
        <ProgressBar step={"5"} />
        <div className="FAQ">
          {this.state.showPlaylists ? (
            <LatestPlaylist
              closePlaylists={this.togglePlaylists.bind(this)}
              model={this.props.model}/>
          ) : null}
        </div>
        <p className="vjueHeader"> Your playlist</p>
        <HeroDisplay hero={this.props.model.hero} />
        <RenderPlaylistCreation
          functionToRender= {this.props.model.createHeroPlaylist()}
          renderData={({ data }) => {this.createdPlaylistcontainor(data)}}
          />
        <div className="divider"></div>
        <div className="text-center">
          <Button
            className="button"
            variant="btn btn-warning btn-lg"
            onClick={this.togglePlaylists.bind(this)}
          >
            Show other playlists created with Hero-ify
          </Button>
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

  createdPlaylistcontainor(data){
    return (<div><p className="copy">
    Congratulations! This is {this.props.model.getHeroName()}'s perfect
    Spotify playlist{data.name}
    </p>
    <div className="divider"></div>
    <Button variant="btn btn-success btn-lg" href={data.href} >Click here to get to your playlist</Button>
    </div>)
  }
}
