import React from 'react';
import Logo from "./Logo-hero-ify.png";
import Faq from "./FAQ.js";
import Back from "./Back";


const h = React.createElement;

    export default class ProgressBar extends React.Component {
        constructor (props) {
          super();
          this.steps = ["1","2","3","4","5"];
          this.step=props.step;
          this.state = {showFAQ: false};
          this.links = ["/choosehero","/chooseMood", "/chooseEnergy" ,"/chooseLength", "/showPlaylist"]
          
        }
        
        toggleFAQ() {
          this.setState({
            showFAQ: !this.state.showFAQ
          });
        }

        render() {
          
          return h("div", {}, h("div",{className:"divider"},null ),
          h("p", {className:"logo-top"}, h("img", {className:"heroify-logo", src:Logo, alt: "Hero-ify"} )),
          <p className = "FAQbutton" onClick={this.toggleFAQ.bind(this)}>FAQ</p>,
          
          this.RenderBack(),
          
          this.RenderProgress(),
          h("div",{className:"divider"},null ),
          h("div", {className:"FAQ"}, this.state.showFAQ ? 
            <Faq
              closeFAQ={this.toggleFAQ.bind(this)}
            />
            : null
          ));

        }

        RenderBack(){
          if(this.step === "1" || this.step === "0"){ 
            return null
          }
          else {return <Back/>}

        }

        RenderProgress(){ 
            let progress = [];
            if (this.step === "0"){
              return <div className= "divider"></div>
            }
            else{
            this.steps.forEach(val => {
                if (val <= this.step){progress.push(<td className="currentstep"></td>)}
                else {progress.push(<td className="notcurrentstep"></td>)}
            })
          console.log(progress);
          return (
            <table className= "ProgressBar">
              <tr>{progress}</tr>
            </table>



          )
          }
    }
  
  }