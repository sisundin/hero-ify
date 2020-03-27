
    import React from "react";
    import { Slider } from "@material-ui/core";
    import ProgressBar from '../HeaderAndFooter/header.js';
    import { Button } from 'react-bootstrap'
    import {Link} from 'react-router-dom';


    export default class ChooseMood extends React.Component {
      constructor(props) {
        super(props);
        this.props=props
        this.state = {
            mood: ""
        };
      }

    update() {
        this.setState({
            mood:document.getElementById("mood").value
        })
    }

    componentDidMount() {
        this.props.model.addObserver(() => this.update());
        
      }
     
    componentWillUnmount() {
        this.props.model.removeObserver(this)
      }


    render() {
        const marks = [
            {
              value: 0,
              label: 'SAD',
            },
            {
              value: 10,
              label: 'Happy',
            }];

    return <div className="outsideDiv">
        <ProgressBar step={"2"}/>
        <p className="vjueHeader"> CHOOSE PLAYLIST MOOD</p>
        <img className = "heroPic" src={this.props.model.getHeroImage()} alt="img"></img>
        <div className="divider"></div>
        <p>
          MOOD
          <Slider id = "mood"
            defaultValue={5}
            aria-labelledby="length-slider"
            step={0.1}
            min={0}
            max={10}
            marks={marks}
          />
        </p>
        <div className="divider"></div>
        <div class="text-center">
        <Link to="/chooseEnergy"><Button variant="btn btn-success btn-lg" onClick={()=>{this.props.model.setMood(document.getElementById("mood").value)}}>NEXT</Button></Link>
        </div>
        </div>
    }
}