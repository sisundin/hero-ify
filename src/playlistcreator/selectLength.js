import React from "react";
import ProgressBar from "../HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default class ChooseLength extends React.Component {
  handleChange = (length) => {
    this.setState({ length });
  };
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      length: 50,
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
    const positionmarks = { 10: "A FEW MOMENTS", 95: "ETERNAL STRUGGLE" };
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
        <p className="viewHeader"> HOW LONG IS YOUR MISSION</p>
        <p className="copy">
          {" "}
          Okey, so we're almost there. Just hold your horses,{" "}
          {this.props.model.getHeroName()}, you'll get to stop a train crash in
          just a minute, we just need to know how long you'll be gone.
        </p>
        <p className="copy">
          Are we talking a mission that's done within a few moments, or some
          kind of eternal struggle?
        </p>
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