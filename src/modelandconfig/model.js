import React  from "react";
import {heroApiENDPOINT, HeroApiAccessToken, firebaseConfig} from "./apiConfig"
import firebase from "firebase";

class HeroIfyModel extends React.Component{
    constructor(){
        super();
        
        this.subscribers=[];
        this.playlistAttributes = {userID:"", genres: [], pepLevel:"" }
        this.firebase = new firebase.initializeApp(firebaseConfig);
        this.db = this.firebase.firestore();
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
        return fetch("https://superhero-search.p.rapidapi.com/?"+string, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "superhero-search.p.rapidapi.com",
                "x-rapidapi-key": "085044a66bmsh071d3aa4fc91f17p1c3914jsn9acbb7d87309"
            }
        }).then(response => this.handleHTTPError(response))
        .then(response => response.json())
        .catch(error => console.log(error));
        


        ///const http = new XMLHttpRequest();
        ///http.open("GET", heroApiENDPOINT+HeroApiAccessToken+string);
        ///http.send();

        ///http.onload = () => console.log(http.responseText)
       /// return fetch(heroApiENDPOINT+HeroApiAccessToken+string, {
        ///    "method": "GET",
        ///    }).then(response => this.handleHTTPError(response))
        ///.then(response => response.json()).then(response => console.log(response))
        ///.catch(error => console.log(error));
         
    }

    handleHTTPError(response) {
        if(response.ok){
           return response;}
        throw Error(response.statusText);
      }

    searchHero(name){
        debugger;
        let data = this.getHeroData("hero="+name);
        console.log(data);
        return data;
    }

    getHeroonID(id){
        let data = this.getHeroData("id=" + id);
        return data;
    }

    heroGenres(powerstats){
        powerstats = {"intelligence":"81","strength":"40","speed":"29","durability":"55","power":"63","combat":"90"};
        let allstats = powerstats.intelligence + powerstats.strength + powerstats.speed + powerstats.durability + powerstats.combat;
        let genres = { "classical": powerstats.intelligence/allstats, "punk":powerstats.strength/allstats, "pop": powerstats.speed/allstats , "lowfy beats": powerstats.durability/allstats, "electronic dance": powerstats.power/allstats, "hip hop": powerstats.combat/allstats};
        return genres;
    }

    //getPlaylists NEEDS RENDER PROMIS
    getOthersPlaylistsfromdatabase(){
        let scoreboard = []
        this.db.collection("created playlists").orderBy("score", "desc").limit(10).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                scoreboard.push({"Hero": doc.Hero , "PlaylistLink": doc.PlaylistLink , "User": doc.User})
            })
        });
    }

    //add a playlist to firebase
    addYourplaylistToDatabase(heroname, playlistlink, user){
        this.db.collection("created playlists").doc().set({
            Hero: heroname,
            PlaylistLink: playlistlink,
            User: user
            
    });
}
    
   //spotify playlist function
    spotifyApiConnect(){

    }
    //generates a link to create spotify playlist from
    generateSpotifyPlaylist(){

    }
    
}

const heroifyModel = new HeroIfyModel();
export default heroifyModel;