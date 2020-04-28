import React from 'react';
import '../App.css';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SearchRenderPromise from '../util/searchRenderPromise.js'
import ProgressBar from '../components/HeaderAndFooter/header.js';
import HeroDisplay from '../components/createHeroDisplay.js';


const h = React.createElement;

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
        <p className="vjueHeader">CHOOSE YOUR HERO</p>
        <p class="copy">To begin with, choose a hero of your liking.</p>
        <p class="copy">Who would you like be rescued from a burning building by today?</p> 
        <div>
            <div className="divider"></div>
            <Form.Group className="searchbox" >
                <Form.Control id="searchInput" size="lg" type="text" placeholder="eg Batman" />
                <Button id="seachbutton" variant="btn btn-success" onClick ={ () => this.update()}>Search!</Button>
            </Form.Group>
            <div className="divider"></div>
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
        <Link to="/chooseMood"> <Button variant="btn btn-success btn-lg" onClick={() => {
            this.props.model.setHero(hero); 
          }}>Select {hero.name}</Button></Link>
          <div className="divider"></div>
          <div className="divider"></div>
          </div>
    }
}