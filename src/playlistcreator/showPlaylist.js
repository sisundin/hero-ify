import React from "react";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroDisplay from "../components/createHeroDisplay.js";
import RenderPromise from "../util/renderPlaylistcreation.js";
import RenderOtherPlaylistsbutton from "../components/showOtherPlaylists";

export default class ShowPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render() {
    return (
      <div className="outsideDiv">
        <ProgressBar step={"5"} />
        <p className="vjueHeader"> Your playlist</p>
        <HeroDisplay hero={this.props.model.hero} />
        <div className="divider"></div>
        <div className="text-center">
          <RenderPromise
            promise={this.props.model.createHeroPlaylist()}
            renderData={() => this.createdPlaylistcontainor()}
          />
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

  createdPlaylistcontainor() {
    let data = this.props.model.getGeneratedPlaylist();
    return <div>
    <p className="copy">
    Congratulations! This is {data.name}. Check it out through the link below!
    </p>
    <Button className="button" variant="btn btn-warning btn-lg" href={data.external_urls.spotify} target="_blank" >Link to your playlist</Button>
    </div>
  }
}
