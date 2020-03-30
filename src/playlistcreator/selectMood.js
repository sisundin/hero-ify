
    import React from "react";
    import ProgressBar from '../HeaderAndFooter/header.js';
    import { Button } from 'react-bootstrap'
    import {Link} from 'react-router-dom';
    import Tooltip from 'rc-tooltip';
    import Slider from 'rc-slider';
    import 'rc-slider/assets/index.css';
    import 'rc-tooltip/assets/bootstrap.css';

    export default class ChooseMood extends React.Component {
      constructor(props) {
        super(props);
        this.props=props
        this.state = {
          mood:5  
      };
      }

      handleChange = mood => {
        this.setState({ mood });
      };

    componentDidMount() {
        this.props.model.addObserver(() => this.update());
        
      }
     
    componentWillUnmount() {
        this.props.model.removeObserver(this)
      }


    render() {
      
      const {mood} = this.state;
      const createSliderWithTooltip = Slider.createSliderWithTooltip;
      // eslint-disable-next-line no-unused-vars
      const Range = createSliderWithTooltip(Slider.Range);
      const Handle = Slider.Handle;
      const positionmarks = {0:'SAD',10:"HAPPY"};
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
      );};

    return (<div className="outsideDiv">
    <ProgressBar step={"2"}/>
    <p className="vjueHeader"> CHOOSE PLAYLIST MOOD</p>
    <img className = "heroPic" src={this.props.model.getHeroImage()} alt="img"></img>
    <div style={wrapperStyle}></div>
    <p>
      MOOD
      <Slider id="mood"
        min={0} 
        max={10} 
        onChange={this.handleChange}
        defaultValue={mood} 
        marks= {positionmarks} 
        step={0.1} 
        handle={handle}
      />
    </p>
    <div className="divider"></div>
    <div class="text-center">
    <Link to="/chooseEnergy"><Button variant="btn btn-success btn-lg" onClick={()=>{
        this.props.model.setMood(mood)}} >NEXT</Button></Link>
    </div>
    </div>)
    }

}