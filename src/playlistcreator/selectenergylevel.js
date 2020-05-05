import React from "react";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import HeroDisplay from "../components/createHeroDisplay.js"

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
    const positionmarks = { 
      0: {
        style: {
          color: 'black',
          
        },
        label: "JUST CHILLING",
      },
      1: {
        style: {
          color: 'black',
        },
        label: "EXTREME BATTLE",
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
        <ProgressBar step={"3"} />
        <p className="vjueHeader"> Need some intensity?</p>
        <p className="copy">What energy level the mission?
        <br/>that {this.props.model.getHeroName()} is set out on today?  </p>
        <HeroDisplay hero={this.props.model.hero}/>
        <div style={wrapperStyle}></div>
        <div className="slider">
          <Slider
            id="energy"
            min={0}
            max={1}
            onChange={this.handleChange}
            defaultValue={energy}
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
        </div>
        <div className="divider"></div>
        <div className="text-center">
          <Link to="/chooseLength">
            <Button
              className="button"
              variant="btn btn-warning btn-lg"
              onClick={() => {
                this.props.model.setEnergy(energy);
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
