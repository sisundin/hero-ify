
    import React from "react";
    import { Slider } from "@material-ui/core";
    import ProgressBar from '../HeaderAndFooter/header.js';
    import { Button } from 'react-bootstrap'
    import {Link} from 'react-router-dom';

    
    export default class ChooseEnergy extends React.Component {
      constructor(props) {
        super();
        this.props=props
        this.state = {
          selectedMood: "happy",
          selectedSetting: "public",
          playlistName: ""
        };
      }


    render() {
        const marks = [
            {
              value: 0,
              label: 'Mellow',
            },
            {
              value: 10,
              label: 'Energetic',
            }];

    return (<div className="outsideDiv">
        <ProgressBar step={"3"}/>
        <p className="vjueHeader"> CHOOSE PLAYLIST ENERGY</p>
        <img className = "heroPic" src={this.props.model.getHeroImage()} alt="img"></img>
        <div className="divider"></div>
        <p>
          ENERGY
          <Slider
            defaultValue={5.5}
            aria-labelledby="length-slider"
            step={0.1}
            min={0}
            max={10}
            marks={marks}
          />
        </p>
        <div className="divider"></div>
        <div class="text-center">
        <Link to="/specPlaylist"><Button variant="btn btn-success btn-lg" >NEXT</Button></Link>
        </div>
        </div>
    )}
}