import React from "react";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import HeroDisplay from "../components/createHeroDisplay.js"

export default class ChooseMood extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      mood: 0.5,
    };
  }

  handleChange = (mood) => {
    this.setState({ mood });
  };

  componentDidMount() {
    this.props.model.addObserver(() => this.update());
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  render() {
    const { mood } = this.state;
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    // eslint-disable-next-line no-unused-vars
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;
    const positionmarks = { 
      0: {
        style: {
          color: 'black',
        },
        label: "SAD"
      },
      1: {
        style: {
          color: 'black',
        },
        label: "HAPPY"
      }
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
        <ProgressBar step={"2"} />
        <p className="vieweHeader"> Choose mood</p>
        <p className="copy"> {this.props.model.getHeroName()}, great choice!
        <br/> Choosing tunes with just the right mood is of essence when creating the perfect save-the-world-playlist.
        <br/>Is {this.props.model.getHeroName()} in the mood for something sad to get them thinking about all that's unfair in the world
        <br/>and all the people that need saving, or is something happy and uplifting more suitable?</p>
        <HeroDisplay hero={this.props.model.hero}/>
        <div style={wrapperStyle}></div>
        <p className="slider">
          <Slider
            id="mood"
            min={0}
            max={1}
            onChange={this.handleChange}
            defaultValue={mood}
            marks={positionmarks}
            step={0.01}
            handle={handle}
            trackStyle={{ backgroundColor: 'black', height: 5 }}
            railStyle={{ backgroundColor: 'white', height: 5 }}
            handleStyle={{
              borderColor: 'blue',
              height: 25,
              width: 25,
              marginTop: -10,
              backgroundColor: 'black',
            }}
          />
        </p>
        <div class="text-center">
          <Link to="/chooseEnergy">
            <Button
              className="button"
              variant="btn btn-success btn-lg"
              onClick={() => {
                this.props.model.setMood(mood);
              }}
            >
              Next
            </Button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }
}
