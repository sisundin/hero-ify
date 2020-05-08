import React, { Component } from "react";

import { Button } from "react-bootstrap";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import logo from "../Assets/logo@300x.png";

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.update = this.update.bind(this);
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

  update() {
    this.setState({});
  }

  componentDidMount() {
    this.props.model.addObserver(() => this.update());
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  hideAllResponses() {
    if (this.state.loggedIn === true) {
      document.getElementById("loggedout").classList.add("hide");
      document.getElementById("loggedin").classList.remove("hide");
    }
  }

  render() {
    return (
      <div className="outsideDiv">
        <ProgressBar step={"0"} />
        <div className="divider"></div>
        <div className="center">
          <img className="heroify-logo-large" src={logo}></img>
        </div>
        <p className="center copy3">
          Get a customized Spotify playlist based on the hero <br />
          you want to be and the music you love
        </p>
        <div className="divider"></div>
        <div class="text-center">
          <Button
            className="button"
            variant="btn btn-warning btn-lg"
            className="btn btn-warning btn-lrg"
          >
            <a
              className="white copy"
              href="http://hero-auth.herokuapp.com/login"
            >
              Let's go!
            </a>
          </Button>
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }
}
