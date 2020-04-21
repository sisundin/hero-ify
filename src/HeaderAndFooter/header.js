import React from 'react';
import Logo from "./Logo-hero-ify.png";

const h = React.createElement;

    export default class ProgressBar extends React.Component {
        constructor (props) {
          super();
          this.steps = ["1","2","3","4","5"];
          this.step=props.step;
          this.state = {};
        }
        render() {
          return h("div", {}, h("div",{className:"divider"},null ),
          h("p", {className:"logo-top"}, h("img", {className:"heroify-logo", src:Logo, alt: "Hero-ify"} )),
          h("table", {className:"ProgressBar"},
          h("tr", {}, this.RenderProgress())),
          h("div",{className:"divider"},null ));
        }

        RenderProgress(){
            let progress = [];
            this.steps.forEach(val => {
                if (val <= this.step){progress.push("currentstep")}
                else {progress.push("notcurrentstep")}
            })
            return progress.map((intication) => <td className={intication}></td>)
      }
    }