import React from 'react';
import {Link} from 'react-router-dom';

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
            renderData = { ({data}) =>  data.map(hero => h("span", {} , this.createDishDisplay(hero)))}
                        />
        ))
    }
    
    createDishDisplay(hero){
    let image = "https://spoonacular.com/recipeImages/"+ dish.image;
    
      return <Link to= {'/details/' + dish.id}>
        <span className= "hero" id= {dish.id} onClick = {() => {
            document.getElementById("search").classList.add('hide');
            document.getElementById("details").classList.remove('hide');
            }}>
        <span>{dish.title}</span>
        <img src = {dishimage} alt = ""></img>
        </span>           
        </Link>
        
    }
    
    
    isDishRepresentation(clickedNode){
        
        
        if(clickedNode.className.includes("food") === true) {
            return clickedNode.getAttribute("id")
            
        }

        if( clickedNode.parentElement.className.includes("food") === true){  
                return clickedNode.parentElement.getAttribute("id")
        }

        else{
            
             return null
        }
    

    }


}