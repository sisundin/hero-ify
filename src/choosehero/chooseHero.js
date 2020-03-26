import React from 'react';
import '../App.css'
import { Button } from 'react-bootstrap'
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
        <ProgressBar step={"0"}/>, 
        h("p", {className:"vjueHeader"} , "Choose Your Hero"), 
         h("div", {}, 
            h("div",{className:"divider"},null ),
            h("div", {className:"searchbox"},
            <input id="searchInput" />,   // free text search box
            <Button onClick ={ () => this.update()}>Search!</Button>
            ),
            h("div",{className:"divider"},null ),
            h("div", {id:"searchresult" , className:"searchresult" }, // empty div for search results
            h("span", {},
            <SearchRenderPromise 

            promise =  {this.props.model.searchHero(this.state.freetext)}
            renderData = { ({data}) => h("span", {}, this.createHeroDisplay(data))}
            />
            
        ),
        <div className="divider"></div>,
        <p>Chosen hero: {this.props.model.getHeroName()}</p>,
        h("div",{className:"divider"},null ),
        <div class="text-center">
            <Link to="/specPlaylist">
            <Button>NEXT </Button>
            </Link>
        </div>
        )))
    }
    
    createHeroDisplay(hero){
      return <div id={hero.id}>
      <img className = "heroPic" src={hero.images.md}></img>
      <div className="divider"></div>
      <p>{hero.name}</p>
      <div className="divider"></div>
      <div class="text-center">
      <Button  onClick={() => this.props.model.setHero(hero)}>Choose</Button>
        </div>
      
      
      </div>    
    }

}