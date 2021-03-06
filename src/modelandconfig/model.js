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
    }, 
    heroplaylistiscreated = { hero : "not" , stats: "not", data:"not"}
  ) {
    super();
    const params = this.getHashParams();
    this.subscribers = [];
    this.trackurilist = [];
    this.hero = hero;
    this.playlistAttributes = playlistAttributes;
    this.heroplaylistiscreated = heroplaylistiscreated;
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    this.createdplaylist = "";
    this.toptrackUID = [];
    this.playlist = {};
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
        heroplaylistiscreated:this.heroplaylistiscreated,
      })
    );
  }

  searchHero(name) {
    let data = this.getHeroData("hero=" + name);

    return data;
  }

  getHeronID(id) {
    let data = this.getHeroData("id=" + id);
    return data;
  }

  getHero(){
    return this.hero;
  }

  getGeneratedPlaylist() {
    return this.playlist;
  }

  setHero(hero) {
    this.hero = hero;
    this.refreshLocalStore();
    this.toptrackUID = this.getMyTopTracksURI(4);
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
  getPlaylistAttributes(){
    return this.playlistAttributes;
  }

  //{ hero : "not" , stats: "not", data:"not"}
  getoldplaylistdata(){
    return this.heroplaylistiscreated.data;
  }

  getOldPlaylistName(){
    return this.heroplaylistiscreated.hero; 
  }

  getOldPlaylistAttributes(){
    return this.heroplaylistiscreated.stats;
  }
  heroGenres(powerstats) {
    var allstats =
      powerstats.intelligence +
      powerstats.strength +
      powerstats.speed +
      powerstats.durability +
      powerstats.power +
      powerstats.combat;
    var genres = {
      "jazz": (powerstats.intelligence / allstats).toFixed(2),
      "grunge": (powerstats.strength / allstats).toFixed(2),
      "minimal-techno": (powerstats.speed / allstats).toFixed(2),
      "r-n-b": (powerstats.durability / allstats).toFixed(2),
      "deep-house": (powerstats.power / allstats).toFixed(2),
      "synth-pop": (powerstats.combat / allstats).toFixed(2),
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

  getPlaylistTracks(genres, topTracks) {
    Object.entries(genres).forEach(([key, value]) => {
      this.getGenreShare(key, value, topTracks);
    });
  }

  createHeroPlaylist() {
    //A list were we put the uri of the songs that go in to the playlist
    this.trackurilist = [];
    //The users top tracks we use to get recommendations
    const topTracks = this.toptrackUID;
    //The functions that gets the share genreas according to the hero you have chosens powerstats
    this.heroGenres(this.hero.powerstats);
    var genres = this.playlistAttributes.genres;

    return (spotifyApi
      .getMe()
      .then((response) => {
        this.playlistAttributes.userID = response.id;
        //First we get the tracks for your playlist
        this.getPlaylistTracks(genres, topTracks);
        //We created a pause function to catch up to the functions a little bit. 
        this.sleep(4000);
        //Then we create the playlist
        return spotifyApi
          .createPlaylist(response.id, {
            name: this.hero.name + "´s Hero-ify Playlist",
            public: true,
          })
          .then((playlistresponse) => {
            //We add the playlist to our database
            this.addYourplaylistToDatabase(
              this.hero.name,
              playlistresponse.external_urls.spotify,
              playlistresponse.owner.display_name
            );
            let uniqtrackurilist = this.uniq(this.trackurilist);
            this.sleep(900);
            //lastly we put all the tracks into the playlist
            spotifyApi.addTracksToPlaylist(
              this.playlistAttributes.userID,
              playlistresponse.id,
              uniqtrackurilist
            );
            this.playlist = playlistresponse;
            this.sleep(500);
            return playlistresponse;
          });
      })
      .then((response) => {
        this.heroplaylistiscreated = { hero : this.hero.name , stats: this.playlistAttributes, data:this.getGeneratedPlaylist()}
        this.refreshLocalStore();
        return response;
      }));
  }

  getGenreShare(genre, genre_ratio, topTracks) {
    var mood = this.playlistAttributes.mood;
    var energy = this.playlistAttributes.energy;
    var length = this.playlistAttributes.length;
    var attributes = {
      target_valence: mood,
      target_energy: energy,
      limit: (genre_ratio * length).toFixed(),
      seed_genres: [genre],
      seed_tracks: topTracks,
    };

    const hero = this.getHeroName();
    spotifyApi.searchTracks(hero, { limit: 1 }).then((response) => {
      const toptrackuri = response.tracks.items[0].uri;
      this.trackurilist.push(toptrackuri);
    });

    spotifyApi.getRecommendations(attributes).then((response) => {
      response.tracks.forEach((track) => {
        this.trackurilist.push(track.uri);
      });
    });
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

  uniq(a) {
    var prims = { boolean: {}, number: {}, string: {} },
      objs = [];

    return a.filter(function (item) {
      var type = typeof item;
      if (type in prims)
        return prims[type].hasOwnProperty(item)
          ? false
          : (prims[type][item] = true);
      else return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  getMyTopTracksURI(limitoftracks = 5) {
    var alltrackstoptracks = [];
    var topTrackslist = [];
    spotifyApi
      .getMyTopTracks({ limit: limitoftracks })
      .then((response) => {
        for (var i = 0, l = response.items.length; i < l; i++) {
          alltrackstoptracks.push(response.items[i]);
        }
      })
      .then(() => {
        alltrackstoptracks.forEach((track) => topTrackslist.push(track.id));
      });

    return topTrackslist;
  }

  getMyTopTracks(limitoftracks = 5) {
    var alltrackstoptracks = [];
    spotifyApi.getMyTopTracks({ limit: limitoftracks }).then((response) => {
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
  heroplaylistiscreated: { 
    hero : "not",
    stats: "not", 
    data:{name:"blaj" , external_urls:{spotify:"http//www.blaj.com"}},
  }
};

const modelString = localStorage.getItem("playlistModel");
let modelObject = JSON.parse(modelString);
modelObject
  ? console.log("User data detected")
  : (modelObject = {
      hero: standardsetting.name,
      playlistAttributes: standardsetting.playlistAttributes,
      heroplaylistiscreated: standardsetting.heroplaylistiscreated,
    });

const heroifyModel = new HeroIfyModel(
  modelObject.hero,
  modelObject.playlistAttributes,
  modelObject.heroplaylistiscreated,
);
export default heroifyModel;
