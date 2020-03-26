import React from "react";
import { Slider } from "@material-ui/core";

export class PlaylistSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMood: "happy",
      selectedSetting: "public",
      playlistName: ""
    };
  }

  handleMoodChange = changeEvent => {
    this.setState({
      selectedMood: changeEvent.target.value
    });
  };

  handleSettingChange = changeEvent => {
    this.setState({
      selectedSetting: changeEvent.target.value
    });
  };

  handleMoodSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    console.log("You have submitted:", this.state.selectedMood);
  };

  handleSettingSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    console.log("You have submitted:", this.state.selectedSetting);
  };

  handleNameSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    console.log("You have submitted:", formSubmitEvent.target.value);
  };

  render() {
    return (
      <div>
        <div>
          Choose Playlist Length
          <Slider
            defaultValue={0}
            aria-labelledby="length-slider"
            step={10}
            valueLabelDisplay="on"
          />
        </div>

        <form onSubmit={this.handleMoodSubmit}>
          Select Playlist Mood
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="mood-selector"
                value="happy"
                checked={this.state.selectedMood === "happy"}
                className="form-check-input"
                onChange={this.handleMoodChange}
              />
              Happy
            </label>
          </div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="mood-selector"
                value="mellow"
                checked={this.state.selectedMood === "mellow"}
                className="form-check-input"
                onChange={this.handleMoodChange}
              />
              Mellow
            </label>
          </div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="mood-selector"
                value="energetic"
                checked={this.state.selectedMood === "energetic"}
                className="form-check-input"
                onChange={this.handleMoodChange}
              />
              Energetic
            </label>
          </div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="mood-selector"
                value="sad"
                checked={this.state.selectedMood === "sad"}
                className="form-check-input"
                onChange={this.handleMoodChange}
              />
              Sad
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary mt-2" type="submit">
              Save
            </button>
          </div>
        </form>

        <form onSubmit={this.handleSettingSubmit}>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="public-private-selector"
                value="public"
                checked={this.state.selectedSetting === "public"}
                className="form-check-input"
                onChange={this.handleSettingChange}
              />
              Public
            </label>
          </div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="public-private-selector"
                value="private"
                checked={this.state.selectedSetting === "private"}
                className="form-check-input"
                onChange={this.handleSettingChange}
              />
              Private
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary mt-2" type="submit">
              Save
            </button>
          </div>
        </form>

        <form onSubmit={this.handleFormSubmit}>
          <label>
            Name your Playlist:
            <br />
            <input type="text" id="playlist-name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
