import React from "react";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import HeroDisplay from "../components/createHeroDisplay.js";

export default class ChooseLength extends React.Component {
  handleChange = (length) => {
    this.setState({ length });
  };
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      length: 42,
    };
  }

  componentDidMount() {
    this.props.model.addObserver(() => this.update());
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  render() {
    const { length } = this.state;
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    // eslint-disable-next-line no-unused-vars
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;
    const positionmarks = {
      10: {
        style: {
          color: "black",
        },
        label: "A FEW MOMENTS",
      },
      95: {
        style: {
          color: "black",
        },
        label: "ETERNAL STRUGGLE",
      },
    };
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
        <ProgressBar step={"4"} />
        <p className="vjueHeader">Choose length</p>
        <p className="copy">
          Just hold your horses, {this.props.model.getHeroName()},
          <br />you'll get to stop a train crash in just a minute, 
          <br />we just need to know how long you'll be gone.
          <br />Are we talking a mission that's done within a few 
          <br />moments, or some kind of eternal struggle?
        </p>
        <HeroDisplay hero={this.props.model.hero} />
        <div style={wrapperStyle}></div>
        <p className="slider">
          <Slider
            id="length"
            min={8}
            max={95}
            onChange={this.handleChange}
            defaultValue={length}
            marks={positionmarks}
            step={1}
            handle={handle}
            trackStyle={{ backgroundColor: "black", height: 5 }}
            railStyle={{ backgroundColor: "white", height: 5 }}
            handleStyle={{
              borderColor: "blue",
              height: 25,
              width: 25,
              marginTop: -10,
              backgroundColor: "black",
            }}
          />
        </p>
        <div className="divider"></div>
        <div class="text-center">
          <Link to="/showPlaylist">
            <Button
              className="button"
              variant="btn btn-warning btn-lg"
              onClick={() => {
                this.props.model.setLength(length);
              }}
            >
              Create playlist
            </Button>
          </Link>
        </div>
        <div className="divider"></div>
      </div>
    );
  }
}
