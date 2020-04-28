import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default class Slider extends React.Component {
  render() {
    return (
      <div className="outsideDiv">
        <ProgressBar step={props.steps} />
        <p className="viewHeader" header={props.header} />
        <p className="copy" copy={props.copy} />
        <div className="Herocard">
          <div className="divider"></div>
          <img className="heroPic" src={props.image} alt="img"></img>
          <div className="divider"></div>
        </div>
        <div style={wrapperStyle}></div>
        <p className="slider">
          LENGTH
          <Slider
            id="length"
            min={10}
            max={95}
            onChange={this.handleChange}
            defaultValue={length}
            marks={positionmarks}
            step={1}
            handle={handle}
          />
        </p>
        <div className="divider"></div>
        <div class="text-center">
          <Link to="/showPlaylist">
            <Button
              variant="btn btn-success btn-lg"
              onClick={() => {
                this.props.model.setLength(length);
              }}
            >
              NEXT
            </Button>
          </Link>
        </div>
        <div className="divider"></div>
      </div>
    );
  }
}
