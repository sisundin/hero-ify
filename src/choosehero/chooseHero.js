import React from 'react';

import SearchRenderPromise from '../util/searchRenderPromise.js'

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
        
        return h("div", {},  
         h("div", {},
            <input id="searchInput" />  , // free text search box

            h("button", {onClick: () => this.update()}, "Search!"), // search button
            
            h("div", {id:"searchresult" }, // empty div for search results
            h("span", {},
            <SearchRenderPromise 

            promise =  {this.props.model.searchHero(this.state.freetext)}
            renderData = { ({data}) => h("span", {}, this.createHeroDisplay(data))}
            />
        ))))
    }
    
    createHeroDisplay(hero){
      return <div id={hero.id}>
      <img src={hero.images.md}></img>
      <div>{hero.name}</div>
      <button onClick={() => this.props.model.setHero(hero)}>Choose</button>
      <div>Chosen hero: {this.props.model.getHeroName()}</div>
      </div>    
    }

}