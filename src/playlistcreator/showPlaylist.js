import React from "react";
    import ProgressBar from '../HeaderAndFooter/header.js';
    import { Button } from 'react-bootstrap'
    import {Link} from 'react-router-dom';

    import LatestPlaylist from '../othersplaylists/allPlaylistsCreated.js'
    
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
            Congratulations! This is {this.props.model.getHeroName()}'s perfect Spotify playlist. Listen to it and dream of saving the world!</p>
            <br></br>
            <p>Share it with your friends, or create a new one. A hero never runs out
            of missions!
            </p>
            <div className="divider"></div>
            <div className="tablecentering">
            <LatestPlaylist model = {this.props.model}/>
            <div className="divider"></div>
            </div>
            <div className="divider"></div>
            <div class="text-center">
<<<<<<< HEAD
            <Link to="/chooseHero">
                <Button variant="btn btn-success btn-lg" onClick={()=>{
                }} > GET YOUR PLAYLIST</Button>
            </Link>
=======
            <Link to="/chooseHero"><Button variant="btn btn-success btn-lg" onClick={()=>{
                }} > CREATE NEW PLAYLIST</Button></Link>
>>>>>>> bf87e8dbd71431d343bd13b3821c1f0b4d1f7779
            </div>
            </div>
        )
    }
}