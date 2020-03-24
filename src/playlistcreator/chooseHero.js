import React from 'react';
import {Link} from 'react-router-dom';
import RenderPromise from '..util/RenderPromise.js'

const h = React.createElement;

export default class chooseHero extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            freetext:""
        };
        
    }

    update() {
        this.setState({
            freetext:document.getElementById("searchInput").value
        })
      }
    
    componentDidMount() {
        //this.updateSearchResults()
        this.props.model.addObserver(() => this.update());
      }
      // this is called when component is removed from the DOM
      // good place to remove observer
    componentWillUnmount() {
        this.props.model.removeObserver(this)
      }
      
    render(){
        return h("div", {},  
         h("div", {},
            <input id="searchInput" />  , // free text search box

            h("button",{onClick: () => this.update()}, "Search!"), // search button
            
            h("div",{id:"searchresult" }, // empty div for search results
            <RenderPromise
            promise =  {this.props.HeroIfyModel.searchHero(this.state.freetext) } 
            renderData = { ({data}) =>  data.map(hero => h("span", {} , this.createHeroDisplay(hero)))}
                        />
        )))
    }
    
    createHeroDisplay(hero){
    let image = hero.images.xs;
    
      return <Link to= {'/details/' + hero.id}>
        <span className= "hero" id= {hero.id} onClick = {() => {
            }}>
        <span>{hero.name}</span>
        <img src = {image} alt = ""></img>
        </span>           
        </Link>
        
    }


}