
    import React from "react";
    import { Slider } from "@material-ui/core";
    import ProgressBar from '../HeaderAndFooter/header.js';
    export default class PlaylistSettings extends React.Component {
      constructor() {
        super();
        this.state = {
          selectedMood: "happy",
          selectedSetting: "public",
          playlistName: ""
        };
      }


    render() {
    return (<div className="outsideDiv">
        <ProgressBar step={"2"}/>
        <div>
          Choose Playlist mood
          <Slider
            defaultValue={0}
            aria-labelledby="length-slider"
            step={10}
            valueLabelDisplay="on"
          />
        </div>
        </div>
    )}
}