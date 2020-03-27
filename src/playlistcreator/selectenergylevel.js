
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
            energy:""
        };
      }

    update() {
        this.setState({
            energy:document.getElementById("energy").value
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
          <Slider id="energy"
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
        <Link to="/specPlaylist"><Button variant="btn btn-success btn-lg" onClick={()=>{this.props.model.setEnergy(document.getElementById("energy").value)}} >NEXT</Button></Link>
        </div>
        </div>
    )}
}