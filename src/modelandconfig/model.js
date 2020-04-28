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
    this.trackurilist = [];
    this.hero = hero;
    this.playlistAttributes = playlistAttributes;
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    this.createdplaylist = "";

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
    var allstats =
      powerstats.intelligence +
      powerstats.strength +
      powerstats.speed +
      powerstats.durability +
      powerstats.power +
      powerstats.combat;
    var genres = {
      jazz: (powerstats.intelligence / allstats).toFixed(2),
      grunge: (powerstats.strength / allstats).toFixed(2),
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

  generatePlaylist() {
    //make own function
    return;
  }

  getHeroPlaylist(genres) {
    Object.entries(genres).forEach(([key, value]) => {
      this.getGenreShare(key, value);
    });
  }

  createHeroPlaylist() {
    //this.trackurilist = [];
    this.heroGenres(this.hero.powerstats); //make own function
    var genres = this.playlistAttributes.genres;
    //console.log("1");
    //console.log(genres);
    //console.log("3");
    //console.log(this.trackurilist);

    var heroPlaylist = [];
    var playlistObj = "";

    spotifyApi.getMe().then((response) => {
      this.playlistAttributes.userID = response.id;
      this.getHeroPlaylist(genres);
      //sleep(6000);
      //console.log("playlist user");
      //console.log(response);
      //console.log(this.playlistAttributes.userID);
      spotifyApi
        .createPlaylist(response.id, {
          name: this.hero.name + " by Hero-ify",
          public: true,
        })
        .then((playlistrespons) => {
          playlistObj = playlistrespons;
          //console.log("här är jag");
          //console.log(playlistrespons.id);
          //console.log(typeof playlistrespons.id);
          this.trackurilist = shuffle(this.trackurilist);
          //sleep(2000);
          //console.log(this.trackurilist);
          //console.log(typeof this.trackurilist);
          spotifyApi
            .addTracksToPlaylist(
              this.playlistAttributes.userID,
              playlistrespons.id,
              this.trackurilist
            )
            .then((addedtrack) => {
              console.log("tracks were added");
              console.log(addedtrack);
            });
          this.createdPlaylist = playlistObj;
        });
    });

    //console.log("5");
    //console.log(heroPlaylist);

    return heroPlaylist;
  }

  getGenreShare(genre, genre_ratio) {
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
      console.log(response.tracks);
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

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
