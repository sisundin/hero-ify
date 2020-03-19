import React  from "react";
import {heroApiENDPOINT, HeroApiAccessToken} from "./apiConfig"

class HeroIfyModel extends React.Component{
    constructor(){
        super();
        
        this.subscribers=[];
        this.playlistAttributes = {userID:"", genres: [], pepLevel:"" }
    
        }
        
    addObserver(callback){
        this.subscribers.push(callback);
 }

    removeObserver (callback) {
    callback = this.subscribers.filter(o => o !== callback);
    };
   
    notifyObservers(whatHappened){
        this.subscribers.forEach(function(callback){ 
            callback(whatHappened);
       });
    }
       
    getHeroData(string) {
        return fetch ( heroApiENDPOINT+HeroApiAccessToken+string, {
            "method": "GET"              

    }).then(response => this.handleHTTPError(response))
        .then(response => response.json())
        .catch(error => console.log(error));
         
    }

    handleHTTPError(response) {
        if(response.ok)
           return response;
        throw Error(response.statusText);
      }

    searchHero(name){
        return this.getHeroData("search/"+name)
    }

    getHeroStats(id){
        let herostats = this.getHeroData(id + "/powerstats");
        let image = this.getHeroData(id+"/image");
        let stats = {"stats" : herostats, "image": image };
        return stats
    }

    heroGenres(powerstats){
        powerstats = {"intelligence":"81","strength":"40","speed":"29","durability":"55","power":"63","combat":"90"}
        let Intelligence = "Classical";
        let Strength = "Punk";
        let Speed = "pop";
        let Durability = "lowfy beats";
        let Power = "electronic Dance";
        let Combat = "hip hop";
        
    

    }

    //All firebasefunctions
    connectToFirebase(){

    }
    //getPlaylists
    getOthersPlaylists(){


    }
    //add a playlist to firebase
    addYourplaylistToDatabase(){

    }
    
   //spotify playlist function
    spotifyApiConnect(){

    }
    //generates a link to create spotify playlist from
    generateSpotifyPlaylist(){

    }
    
}