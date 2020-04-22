import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SearchRenderPromise from '../util/searchRenderPromise.js'
import ProgressBar from '../HeaderAndFooter/header.js';

const h = React.createElement;

export default class ChooseHero extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            freetext:"superman",
            selectedHero:{}
        };

        this.update = this.update.bind(this)
        this.setHero = this.setHero.bind(this);
        
    }

    update() {
        this.setState({
            freetext:document.getElementById("searchInput").value
        })
    }

    setHero(hero) {
        this.setState({
            selectedHero:hero
        })
    }
    
    componentDidMount() {
        this.props.model.addObserver(() => this.update());
        
      }
     
    componentWillUnmount() {
        this.props.model.removeObserver(this)
      }

    render(){
        
        return h("div", {className:"outsideDiv"},
        <ProgressBar step={"1"}/>, 
        h("p", {className:"vjueHeader"} , "CHOOSE YOUR HERO"), 
        h("p", {class:"copy"}, "To begin with, choose a hero of your liking."),
        h("p", {class:"copy"}, "Who would you like be rescued from a burning building by today?"),
        h("div", {}, 
            h("div",{className:"divider"},null ),
            h("div", {className:"searchbox"},
            <input id="searchInput" placeholder="eg Batman" />,   // free text search box
            <Button variant="btn btn-success" onClick ={ () => this.update()}>Search!</Button>
            ),
            h("div",{className:"divider"},null ),
            h("div", {id:"searchresult" , className:"searchresult" }, // empty div for search results
            h("span", {},
            <SearchRenderPromise
            promise =  {this.props.model.searchHero(this.state.freetext)}
            renderData = { ({data}) => this.createHeroDisplay(data)}
            />
            
        ),
        )))
    }
    
    createHeroDisplay(hero){
      return <div><div id={hero.id} class="Herocard ">
        <div className="divider"></div>
      <Image className = "heroPic" src={hero.images.lg} alt="image not found" ></Image>
        <div className="divider"></div>
        </div>   
        <div className="divider"></div>
        <div className="divider"></div> 
        <Link to="/chooseMood"> <Button variant="btn btn-success btn-lg" onClick={() => {
            this.setHero(hero);
            this.props.model.setHero(hero); 
          }}>Select {hero.name}</Button></Link>
          <div className="divider"></div>
          <div className="divider"></div>
          </div>
    }

    dcreateHeroDisplay(hero){
        return <div class="card" style="width: 18rem;">
        <Image class="card-img-top" src="hero.images.lg" alt="No Image found"></Image>
        <div class="card-body">
            <h5 class="card-title">{hero.name}</h5>
            <p class="card-text"> {hero.biography.firstAppearance}</p>
            <Link to="/chooseMood"> 
                <a onClick={() => { this.props.model.setHero(hero); }} class="btn btn-primary">Select {hero.name}</a>
        </Link>
        </div>
        
        </div>
    }

    RenderNextButton(argument){
        let button = null;
        if( argument.argument === "You need to pick a hero!"){
            button= null;
            }
        else{
            button = <Link to="/chooseMood"><Button variant="btn btn-success btn-lg" >NEXT</Button></Link>
        };
        return button;
    }

}