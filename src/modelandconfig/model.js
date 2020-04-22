import React from "react";
import { heroApihost, HeroApiAccessKey, firebaseConfig } from "./apiConfig";
import firebase from "firebase";
import Spotify from "spotify-web-api-js";
const spotifyApi = new Spotify();

class HeroIfyModel extends React.Component {
  constructor(
    hero = { name: "You need to pick a hero!", images: { lg: "no image" } },
    playlistAttributes = {
      userID: "",
      genres: [],
      mood: "",
      energy: "",
      length: "",
    }
  ) {
    super();
    const params = this.getHashParams();
    this.subscribers = [];
    this.hero = hero;
    this.playlistAttributes = playlistAttributes;
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
  }

  handleHTTPError(response) {
    if (response.ok) {
      return response;
    }
    throw Error(response.statusText);
  }

  refreshLocalStore() {
    localStorage.setItem(
      "playlistModel",
      JSON.stringify({
        hero: this.hero,
        playlistAttributes: this.playlistAttributes,
      })
    );
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
    this.refreshLocalStore();
  }

  setMood(mood) {
    this.playlistAttributes.mood = mood;
    this.refreshLocalStore();
  }

  setLength(length) {
    this.playlistAttributes.length = length;
    this.refreshLocalStore();
  }

  setEnergy(energy) {
    this.playlistAttributes.energy = energy;
    this.refreshLocalStore();
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
      powerstats.power +
      powerstats.combat;
    var genres = {
      classical: (powerstats.intelligence / allstats).toFixed(2),
      punk: (powerstats.strength / allstats).toFixed(2),
      pop: (powerstats.speed / allstats).toFixed(2),
      electronic: (powerstats.durability / allstats).toFixed(2),
      dance: (powerstats.power / allstats).toFixed(2),
      metal: (powerstats.combat / allstats).toFixed(2),
    };
    this.playlistAttributes.genres = genres;
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
    var playlistObj = [];
    spotifyApi
      .getMe()
      .then((response) => (this.playlistAttributes.userID = response.id)); //make own function
    playlistObj = spotifyApi
      .createPlaylist({
        userId: this.playlistAttributes.userID,
        name: this.hero.name,
      })
      .then((response) =>
        response.items.forEach((item) => playlistObj.push(item))
      );
    console.log(playlistObj);
    return playlistObj;
  }

  createHeroPlaylist() {
    this.heroGenres(this.hero.powerstats); //make own function
    var genres = this.playlistAttributes.genres;
    console.log(genres);
    var playlistId = this.generatePlaylist().id;
    console.log(playlistId);
    var listOfGenres = [];

    for (let [key, value] of Object.entries(genres)) {
      listOfGenres.push(this.getGenreShare(key, value));
    }

    console.log(listOfGenres);

    var uriArray = listOfGenres.flat();

    console.log(uriArray);

    var heroPlaylist = [];

    spotifyApi
      .addTracksToPlaylist({ playlistId: playlistId, uris: uriArray })
      .then((response) =>
        response.forEach((track) => heroPlaylist.push(track))
      );

    console.log(heroPlaylist);

    return heroPlaylist;
  }

  getGenreShare(genre, genre_ratio) {
    var genreShare = [];
    var mood = this.playlistAttributes.mood;
    var energy = this.playlistAttributes.energy;
    var length = this.playlistAttributes.length;
    var attributes = {
      target_valence: mood,
      target_energy: energy,
      limit: (genre_ratio * length).toFixed(),
      seed_genres: [genre],
    };

    spotifyApi.getRecommendations(attributes).then((response) => {
      response.tracks.forEach((track) => genreShare.push(track.uri));
    });

    console.log(genreShare);

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

const standardsetting = {
  hero: { name: "You need to pick a hero!", images: { lg: "no image" } },
  playlistAttributes: {
    userID: "",
    genres: [],
    mood: "",
    energy: "",
    length: "",
  },
};
const modelString = localStorage.getItem("playlistModel");
let modelObject = JSON.parse(modelString);
modelObject
  ? console.log("User data detected")
  : (modelObject = {
      hero: standardsetting.name,
      playlistAttributes: standardsetting.playlistAttributes,
    });
    
const heroifyModel = new HeroIfyModel(
  modelObject.hero,
  modelObject.playlistAttributes
);
export default heroifyModel;
