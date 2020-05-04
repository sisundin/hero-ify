import React from "react";
import Logo from "./logo@300x.png";
import Faq from "./FAQ.js";
import Back from "./Back";
import SmallLogo from "./logo_small.js";

const h = React.createElement;

export default class ProgressBar extends React.Component {
  constructor(props) {
    super();
    this.steps = ["1", "2", "3", "4", "5"];
    this.step = props.step;
    this.state = { showFAQ: false };
    this.links = [
      "/choosehero",
      "/chooseMood",
      "/chooseEnergy",
      "/chooseLength",
      "/showPlaylist",
    ];
  }

  toggleFAQ() {
    this.setState({
      showFAQ: !this.state.showFAQ,
    });
  }

  render() {
    return h(
      "div",
      {},
      h("div", { className: "divider" }, null),
      this.RenderLogo(),
      <p className="FAQbutton" onClick={this.toggleFAQ.bind(this)}>
        FAQ
      </p>,

      this.RenderBack(),

      this.RenderProgress(),
      h("div", { className: "divider" }, null),
      h(
        "div",
        { className: "FAQ" },
        this.state.showFAQ ? <Faq closeFAQ={this.toggleFAQ.bind(this)} /> : null
      )
    );
  }

  RenderBack() {
    if (this.step === "1" || this.step === "0") {
      return null;
    } else {
      return <Back />;
    }
  }

  RenderLogo() {
    if (this.step === "0") {
      return null;
    } else {
      return <SmallLogo />;
    }
  }

  RenderProgress() {
    let progress = [];
    if (this.step === "0") {
      return <div className="divider"></div>;
    } else {
      this.steps.forEach((val) => {
        if (val <= this.step) {
          progress.push(<td key={val} className="currentstep"></td>);
        } else {
          progress.push(<td key={val} className="notcurrentstep"></td>);
        }
      });
      return (
        <table className="ProgressBar">
          <tbody>
            <tr>{progress}</tr>
          </tbody>
        </table>
      );
    }
  }
}
