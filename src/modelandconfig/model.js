import React from "react";
import { heroApihost, HeroApiAccessKey, firebaseConfig } from "./apiConfig";
import firebase from "firebase";
import Spotify from "spotify-web-api-js";
const spotifyApi = new Spotify();

class HeroIfyModel extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.subscribers = [];
    this.hero = {
      name: "You need to pick a hero!",
      images: { lg: "no image" },
    };
    this.playlistAttributes = {
      userID: "",
      genres: [{ pop: 0.5, rock: 0.5 }],
      mood: "",
      energy: "",
      length: "",
    };
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
    }
    this.state = {
      loggedIn: params.access_token ? true : false,
    };
  }

  addObserver(callback) {
    this.subscribers.push(callback);
  }

  removeObserver(callback) {
    callback = this.subscribers.filter((o) => o !== callback);
  }

  notifyObservers(whatHappened) {
    this.subscribers.forEach(function (callback) {
      callback(whatHappened);
    });
  }

  getHeroData(string) {
    return fetch("https://superhero-search.p.rapidapi.com/?" + string, {
      method: "GET",
      headers: {
        "x-rapidapi-host": heroApihost,
        "x-rapidapi-key": HeroApiAccessKey,
      },
    })
      .then((response) => this.handleHTTPError(response))
      .then((response) => response.json())
      .catch((error) => console.log(error));

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
    if (response.ok) {
      return response;
    }
    throw Error(response.statusText);
  }

  /// Sök bara på namn i en sträng
  searchHero(name) {
    let data = this.getHeroData("hero=" + name);
    console.log(data);
    return data;
  }
  /// Sök bara på id i en sträng
  getHeronID(id) {
    let data = this.getHeroData("id=" + id);
    return data;
  }

  setHero(hero) {
    this.hero = hero;
    console.log(this.hero);
  }

  setMood(mood) {
    this.playlistAttributes.mood = mood;
    console.log(this.playlistAttributes);
  }

  setLength(length) {
    this.playlistAttributes.length = length;
    console.log(this.playlistAttributes);
  }

  setEnergy(energy) {
    this.playlistAttributes.energy = energy;
    console.log(this.playlistAttributes);
  }

  getHeroName() {
    return this.hero.name;
  }

  getHeroId() {
    return this.hero.id;
  }

  getHeroImage() {
    return this.hero.images.lg;
  }

  heroGenres(powerstats) {
    /// powerstats = {"intelligence":"81","strength":"40","speed":"29","durability":"55","power":"63","combat":"90"};
    var allstats =
      powerstats.intelligence +
      powerstats.strength +
      powerstats.speed +
      powerstats.durability +
      powerstats.combat;
    var genres = {
      classical: powerstats.intelligence / allstats,
      punk: powerstats.strength / allstats,
      pop: powerstats.speed / allstats,
      "lo fi beats": powerstats.durability / allstats,
      "electronic dance": powerstats.power / allstats,
      "hip hop": powerstats.combat / allstats,
    };
    genres.forEach((genre) => this.playlistAttributes.genres.push(genre));
  }

  //getPlaylists NEEDS RENDER PROMIS
  getOthersPlaylistsfromdatabase(limit = 5) {
    let playlists = [];
    return this.db
      .ref("UserGenereatedPlaylists")
      .limitToLast(limit)
      .once("value")
      .then((snapshot) => {
        snapshot = snapshot.toJSON();
        Object.values(snapshot)
          .reverse()
          .forEach((doc) => {
            playlists.push({
              Hero: doc.Hero,
              PlaylistLink: doc.PlaylistLink,
              User: doc.User,
            });
          });
        return playlists;
      });
  }

  //add a playlist to firebase
  addYourplaylistToDatabase(heroname, playlistlink, user) {
    this.db.ref("UserGenereatedPlaylists/" + user).set({
      Hero: heroname,
      PlaylistLink: playlistlink,
      User: user,
    });
  }

  generatePlaylist() {
    var userID = [];
    spotifyApi.getMe().then((response) => userID.push(response.id));
    console.log(userID);
    var playlistObj = spotifyApi.createPlaylist({
      playlistId: this.playlistAttributes.userID,
      name: this.hero.name,
    });
    console.log(playlistObj);
    return playlistObj;
  }

  createHeroPlaylist() {
    //this.heroGenres(this.hero.powerstats);
    var genres = this.playlistAttributes.genres;
    console.log(genres);
    var playlistId = this.generatePlaylist().id;
    console.log(playlistId);
    var uriArray = [];

    for (let [key, value] of Object.entries(genres)) {
      uriArray.push(this.getGenreShare(key, value));
    }

    spotifyApi.addTracksToPlaylist({ playlistId: playlistId, uris: uriArray });

    return spotifyApi.getPlaylist(playlistId);
  }

  getGenreShare(genre, genre_ratio) {
    var genreShare = [];
    var mood = this.playlistAttributes.mood;
    var energy = this.playlistAttributes.energy;
    var length = this.playlistAttributes.length;
    var attributes = {
      target_valence: mood,
      target_energy: energy,
      limit: genre_ratio * length,
      seed_genres: { genre },
    };

    spotifyApi.getRecommendations(attributes).then((response) => {
      for (var i = 0, l = response.items.length; i < l; i++) {
        genreShare.push(response.items[i].uri);
      }
    });

    return genreShare;
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getMyTopTracks() {
    var alltrackstoptracks = [];
    spotifyApi.getMyTopTracks({ limit: 100 }).then((response) => {
      for (var i = 0, l = response.items.length; i < l; i++) {
        alltrackstoptracks.push(response.items[i]);
      }
    });
    return alltrackstoptracks;
  }
}

const heroifyModel = new HeroIfyModel();
export default heroifyModel;
