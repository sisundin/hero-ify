import React from "react";
    import ProgressBar from '../HeaderAndFooter/header.js';
    import { Button } from 'react-bootstrap'
    import {Link} from 'react-router-dom';
    import Tooltip from 'rc-tooltip';
    import Slider from 'rc-slider';
    import 'rc-slider/assets/index.css';
    import 'rc-tooltip/assets/bootstrap.css';

    
    export default class ShowPlaylist extends React.Component {

        constructor(props) {
            super(props);
            this.props=props;
        }    

        
        render(){
            const wrapperStyle = { width: 400, margin: 50 };

            return (<div className="outsideDiv">
            <ProgressBar step={"5"}/>
            <p className="vjueHeader"> YOUR PLAYLIST</p>
            <img className = "heroPic" src={this.props.model.getHeroImage()} alt="img"></img>
            <div style={wrapperStyle} className="divider"></div>
            <p>
                Congratulations - enjoy and share it with your friends!
            </p>
            <div className="divider"></div>
            <div class="text-center">
            <Link to="/chooseHero"><Button variant="btn btn-success btn-lg" onClick={()=>{
                }} > GET YOUR PLAYLIST</Button></Link>
            </div>
            </div>
        )
    }
}