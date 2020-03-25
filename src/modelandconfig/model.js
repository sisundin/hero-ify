import React  from "react";
import {heroApihost, HeroApiAccessKey, firebaseConfig} from "./apiConfig"
import firebase from "firebase";
import Spotify from 'spotify-web-api-js'
const spotifyApi = new Spotify()

class HeroIfyModel extends React.Component {
  constructor () {
    super()
    this.subscribers = []
    this.hero = {name:"No hero chosen"}
    
    this.playlistAttributes = {userID:"", genres: [], pepLevel:"" }
    firebase.initializeApp(firebaseConfig)
    this.db = firebase.database();

    
}

  addObserver (callback) {
    this.subscribers.push(callback)
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
                "x-rapidapi-host": heroApihost,
                "x-rapidapi-key": HeroApiAccessKey
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
    /// Sök bara på namn i en sträng
    searchHero(name){
        let data = this.getHeroData("hero=" + name);
        console.log(data);
        return data;
    }
    /// Sök bara på id i en sträng
    getHeronID(id){
        let data = this.getHeroData("id=" + id);
        return data;
    }

    setHero(hero){
    
        this.hero = hero;
        this.notifyObservers("hero was added");
    }

    getHeroName(){
        return this.hero.name;
    }

    getHeroId(){
        return this.hero.id;
    }

    heroGenres(powerstats){
        /// powerstats = {"intelligence":"81","strength":"40","speed":"29","durability":"55","power":"63","combat":"90"};
        let allstats = powerstats.intelligence + powerstats.strength + powerstats.speed + powerstats.durability + powerstats.combat;
        let genres = { "classical": powerstats.intelligence/allstats, "punk":powerstats.strength/allstats, "pop": powerstats.speed/allstats , "lowfy beats": powerstats.durability/allstats, "electronic dance": powerstats.power/allstats, "hip hop": powerstats.combat/allstats};
        return genres;
    }

    //getPlaylists NEEDS RENDER PROMIS
    getOthersPlaylistsfromdatabase(){
        let playlists = [];
        this.db.ref("UserGenereatedPlaylists").limitToLast(2).once('value').then((snapshot) => {
            console.log(snapshot.toJSON());
            snapshot = snapshot.toJSON();
            console.log(snapshot);
            Object.values(snapshot).forEach((doc) => {
                console.log(doc);
                playlists.push({Hero: doc.Hero, PlaylistLink:doc.PlaylistLink, User:doc.User})
            })
            console.log(playlists);
            return playlists;
        });
        
        
    }

    //add a playlist to firebase
    addYourplaylistToDatabase(heroname, playlistlink, user){
        this.db.ref("UserGenereatedPlaylists/"+user).set({
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

getMyTopTracks () {
    var alltrackstoptracks = []
    spotifyApi.getMyTopTracks({ limit: 100 }).then(response => {
        for (var i = 0, l = response.items.length; i < l; i++) {
        alltrackstoptracks.push(response.items[i])
        }
        this.setState({
        topTracks: alltrackstoptracks
        })
    })
    }
    
    
}




const heroifyModel = new HeroIfyModel();
export default heroifyModel;