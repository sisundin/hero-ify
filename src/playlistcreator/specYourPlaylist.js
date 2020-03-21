import React, { Component } from "react";

class Length extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Typography id="length-slider" gutterBottom>
          Choose Playlist Length
        </Typography>
        <Slider
          defaultValue={0}
          getAriaValueText={valuetext}
          aria-labelledby="length-slider"
          step={10}
          valueLabelDisplay="on"
        />
      </div>
    );
  }
}

class Mood extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render () {
    return (
      <form>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="mood-selector"
              value="happy"
              checked={true}
              className="form-check-input"
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
              className="form-check-input"
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
              className="form-check-input"
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
              className="form-check-input"
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
    );
  }
}

class Name extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <form>
        <label>
          Name your Playlist
          <input type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class PublicPrivate extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <form>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="public-private-selector"
              value="public"
              checked={true}
              className="form-check-input"
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
              className="form-check-input"
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
    );
  }
}

export default class playlistSettings extends React.Component {
  render () {
    return (
      <div>
        <Length />
        <Mood />
        <PublicPrivate />
        <Name />
      </div>
    );
  }
}
