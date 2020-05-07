import React from "react";
import { heroApihost, HeroApiAccessKey, firebaseConfig } from "./apiConfig";
import firebase from "firebase";
import Spotify from "spotify-web-api-js";
import playlistCover from "../Assets/playlistcover.jpg";
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
    this.toptrackID = [];
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
      })
    );
  }

  /// Sök bara på namn i en sträng
  searchHero(name) {
    let data = this.getHeroData("hero=" + name);

    return data;
  }
  /// Sök bara på id i en sträng
  getHeronID(id) {
    let data = this.getHeroData("id=" + id);
    return data;
  }

  getGeneratedPlaylist() {
    console.log("getPlaylsit Generated:");
    console.log(this.playlist);
    return this.playlist;
  }

  setHero(hero) {
    this.hero = hero;
    this.refreshLocalStore();
    this.toptrackID = this.getMyTopTracksURI(4);
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

  getHeroPlaylist(genres, topTracks) {
    Object.entries(genres).forEach(([key, value]) => {
      this.getGenreShare(key, value, topTracks);
    });
  }

  createHeroPlaylist() {
    this.trackurilist = [];
    const topTracks = this.toptrackID;
    this.heroGenres(this.hero.powerstats);
    var genres = this.playlistAttributes.genres;

    return spotifyApi
      .getMe()
      .then((response) => {
        this.playlistAttributes.userID = response.id;
        this.getHeroPlaylist(genres, topTracks);
        sleep(4000);
        return spotifyApi
          .createPlaylist(response.id, {
            name: this.hero.name + "´s Hero-ify Playlist",
            public: true,
          })
          .then((playlistrespons) => {
            this.addYourplaylistToDatabase(
              this.hero.name,
              playlistrespons.external_urls.spotify,
              playlistrespons.owner.display_name
            );
            let uniqtrackurilist = uniq(this.trackurilist);
            //uniqtrackurilist = shuffle(uniqtrackurilist);
            sleep(900);
            spotifyApi.addTracksToPlaylist(
              this.playlistAttributes.userID,
              playlistrespons.id,
              uniqtrackurilist
            );
            this.playlist = playlistrespons;
            console.log("THIS.Playlist:");
            console.log(this.playlist);
            sleep(500);
            return playlistrespons;
          });
      })
      .then((response) => {
        console.log("this is the response ");
        console.log(response);
        return response;
      });
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

//A funktion for shuffleing an array (NOT USED)
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uniq(a) {
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
