import React, { Component } from "react";

import { Button } from "react-bootstrap";
import ProgressBar from "../components/HeaderAndFooter/header.js";
import logo from "../Assets/logo@300x.png";

export default class SignInView extends Component {
  render() {
    return (
      <div className="outsideDiv">
        <ProgressBar step={"0"} />
        <div className="divider"></div>
        <div className="center">
          <img className="heroify-logo-large" src={logo} alt=""></img>
        </div>
        <p className="center copy3">
          Get a customized Spotify playlist based on the hero <br />
          you want to be and the music you love
        </p>
        <div className="divider"></div>
        <div className="text-center">
          <Button
            className="button"
            variant="btn btn-warning btn-lg"
          >
            <a className="button" href="http://hero-auth.herokuapp.com/login">
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
