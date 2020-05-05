import React from 'react';
import '../App.css';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SearchRenderPromise from '../util/searchRenderPromise.js'
import ProgressBar from '../components/HeaderAndFooter/header.js';
import HeroDisplay from '../components/createHeroDisplay.js';

export default class ChooseHero extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            freetext:"superman"
        };

        this.update = this.update.bind(this);
        
    }

    update() {
        this.setState({
            freetext:document.getElementById("searchInput").value
        });
    }
    
    componentDidMount() {
        this.props.model.addObserver(() => this.update());
        
      }
     
    componentWillUnmount() {
        this.props.model.removeObserver(this)
      }

    render(){
        
        return <div className="outsideDiv">
        <ProgressBar step={"1"}/> 
        <p className="vjueHeader">Choose your hero</p>
        <p className="copy">Choose a hero of your liking. What would Spiderman, Master Chief, 
        <br/>Harry Potter or any other hero out there would have in their headphones? 
        <br/>Or perhaps Darth Vader if you woke up on the dark side.
        </p>
        <div>
            <div id="searchresult" className="searchresult"> 
                <span>
                <SearchRenderPromise
                 promise =  {this.props.model.searchHero(this.state.freetext)}
                 renderData = { ({data}) => this.createHeroDisplay(data)}
                />
                </span>
            </div>
        </div>
        </div>
    }
    
    createHeroDisplay(hero){
      return <div><HeroDisplay hero={hero}/>
        <Form.Group className="searchbox" >
            <Form.Control id="searchInput" size="lg" type="text" placeholder="Batman, Yoda, James Bond..." />
            <Button className="button" id="seachbutton" variant="btn btn-warning" onClick ={ () => this.update()}>Search!</Button>
        </Form.Group>
        <div className="divider"></div>
        <div className="divider"></div>
        <Link to="/chooseMood"> <div className="text-center"><Button className="button" variant="btn btn-warning btn-lg" onClick={() => {
            this.props.model.setHero(hero); 
          }}>Select {hero.name}</Button></div></Link>
          <div className="divider"></div>
          <div className="divider"></div>
          </div>
    }
}