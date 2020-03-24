import React  from "react";
import {heroApihost, HeroApiAccessKey, firebaseConfig, token} from "./apiConfig"
import firebase from "firebase";
import Spotify from 'spotify-web-api-js'
const spotifyApi = new Spotify()

class HeroIfyModel extends React.Component {
  constructor () {
    super()
    this.subscribers = []
    this.hero = ""
    this.playlistAttributes = {userID:"", genres: [], pepLevel:"" }
    firebase.initializeApp(firebaseConfig)
    firebase.auth().signInWithCustomToken(token).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    this.db = firebase.firestore();

    
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
        let data = this.getHeroData("hero="+name);
        console.log(data);
        return data;
    }
    /// Sök bara på id i en sträng
    getHeronID(id){
        let data = this.getHeroData("id=" + id);
        return data;
    }

    addHero(id){
        this.hero = id;
        this.notifyObservers("hero was added");
    }

    heroGenres(powerstats){
        /// powerstats = {"intelligence":"81","strength":"40","speed":"29","durability":"55","power":"63","combat":"90"};
        let allstats = powerstats.intelligence + powerstats.strength + powerstats.speed + powerstats.durability + powerstats.combat;
        let genres = { "classical": powerstats.intelligence/allstats, "punk":powerstats.strength/allstats, "pop": powerstats.speed/allstats , "lowfy beats": powerstats.durability/allstats, "electronic dance": powerstats.power/allstats, "hip hop": powerstats.combat/allstats};
        return genres;
    }

    //getPlaylists NEEDS RENDER PROMIS
    getOthersPlaylistsfromdatabase(){
        let scoreboard = [];
        this.db.collection("hero-ify").orderBy().limit(10).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                scoreboard.push({"Hero": doc.Hero , "PlaylistLink": doc.PlaylistLink , "User": doc.User})
            })
            
        });
        return scoreboard;
    }

    //add a playlist to firebase
    addYourplaylistToDatabase(heroname, playlistlink, user){
        this.db.collection("hero-ify").doc().set({
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