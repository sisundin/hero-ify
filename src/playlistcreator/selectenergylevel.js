import React from "react";
import ProgressBar from "../HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default class ChooseEnergy extends React.Component {
  handleChange = (energy) => {
    this.setState({ energy });
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      energy: 0.5,
    };
  }

  componentDidMount() {
    this.props.model.addObserver(() => this.update());
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  render() {
    const { energy } = this.state;
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    // eslint-disable-next-line no-unused-vars
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;
    const positionmarks = { 0: "OLD LADY", 1: "ALIENS" };
    const wrapperStyle = { width: 400, margin: 30 };
    const handle = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

    return (
      <div className="outsideDiv">
        <ProgressBar step={"3"} />
        <p className="vjueHeader"> CHOOSE PLAYLIST ENERGY</p>s
        <p className="copy">What kind of energy level is needed for the mission that {this.props.model.getHeroName()} is set out on today?</p>
        <p className="copy">Is it more of
        a chill help an old lady carry groceries kind of vibe, or more like battling an army of aliens?</p>
        <div className="Herocard">
        <div className="divider"></div>
        <img
          className="heroPic"
          src={this.props.model.getHeroImage()}
          alt="img"
        ></img>
        <div className="divider"></div>
        </div>
        <div style={wrapperStyle}></div>
        <p className="slider">
          ENERGY
          <Slider
            id="energy"
            min={0}
            max={1}
            onChange={this.handleChange}
            defaultValue={energy}
            marks={positionmarks}
            step={0.01}
            handle={handle}
          />
        </p>
        <div className="divider"></div>
        <div class="text-center">
          <Link to="/chooseLength">
            <Button
              variant="btn btn-success btn-lg"
              onClick={() => {
                this.props.model.setEnergy(energy);
              }}
            >
              NEXT
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
