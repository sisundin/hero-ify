import React from 'react';
import { Image } from 'react-bootstrap';

export default class HeroDisplay extends React.Component {
    constructor (props) {
        super();
        this.hero = props.hero;
    }
    render() {
      return (<div><div id={this.props.hero.id} class="Herocard ">
      <div className="divider"></div>
    <Image className = "heroPic" src={this.props.hero.images.lg} alt="image not found" ></Image>
      <div className="divider"></div>
      </div>   
      <div className="divider"></div>
      <div className="divider"></div>
      </div>
      )
    };
}
