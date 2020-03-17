import React from 'react';
import {Link} from 'react-router-dom';
const h = React.createElement;


export default function TextFörLäsning(props){
    const text = props.text.text;
    const title = props.text.riktigtitle;
    
    React.useEffect(() => {
        
        
        }, [props]);
        
      
        return h("div", {} , 
        h("div", {}, h("p", {className:"titleforread"}, title),
        h("div" ,{className:"divider"}, null),
        h("div", {}, h("div", {className:"texttoread"}, text.map(paragraf => h("p", {}, paragraf)))),
        h("div" , {} ,<Link to= '/home'>
            <button className="navigationbutton" onClick={() =>{console.log("klar med text " + title);
        
        }}>
            Klar
            </button>
        </Link>),
        h("div" ,{className:"divider"}, null)   
        ))
    }