import React from "react";
import LatestPlaylist from "./allPlaylistsCreated.js";
import { Button } from "react-bootstrap";
const h = React.createElement;

export default class RenderOtherPlaylistsbutton extends React.Component {
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
    return h("div",{},
    <Button className="button"
    variant="btn btn-warning btn-lg"
    onClick={this.togglePlaylists.bind(this)}>
         Show other playlists created with Hero-ify
      </Button>,
    h("div", { className: "FAQ" },
        this.state.showPlaylists ? <LatestPlaylist closePlaylists={this.togglePlaylists.bind(this)}
        model={this.props.model} /> : null
    ));
  }
}
