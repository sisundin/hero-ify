import React from 'react';
import heroifyModel from './model.js';
import SearchRenderPromise from './util/searchRenderPromise.js'

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
        heroifyModel.addObserver(() => this.update());
        
      }
     
    componentWillUnmount() {
        heroifyModel.removeObserver(this)
      }

    render(){
        
        return h("div", {},  
         h("div", {},
            <input id="searchInput" />  , // free text search box

            h("button", {onClick: () => this.update()}, "Search!"), // search button
            
            h("div", {id:"searchresult" }, // empty div for search results
            h("span", {},
            <SearchRenderPromise 

            promise =  {heroifyModel.searchHero(this.state.freetext)}
            renderData = { ({data}) => h("span", {}, this.createHeroDisplay(data))}
            />
        ))))
    }
    
    createHeroDisplay(hero){
      return <div>
      <img src={hero.images.md}></img>
      <div>{hero.name}</div>
      <button onClick={() => this.setHero(hero)}>Choose</button>
      <div>Chosen hero: {this.state.selectedHero.name}</div>
      </div>    
    }

}