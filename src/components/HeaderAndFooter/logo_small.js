import React from 'react';
import Logo from "./logo@300x.png";

export default class SmallLogo extends React.Component {
    render() {
      return <img className="heroify-logo-small" src={Logo} alt="Hero-ify"></img>
    }
  }