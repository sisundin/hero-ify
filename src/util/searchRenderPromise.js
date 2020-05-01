import React from 'react';
import nothingfound from './nothingfound.gif'
import spin from '../Assets/spinner_highres.gif'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const h = React.createElement;

export default function SearchRenderPromise({promise, renderData}){

    const [data, setData]=React.useState(null);
    React.useEffect(()=>{setData(null);
          promise.then(sleeper(2000)).then(x=>setData(x))
                 .catch(err=>setData({error:err}));
    }, [promise]);  // TODO: return cancel promise on unmount
 
    return  (data===null && h("img", {className:"spinner-gif", src:spin}))
         || (data !==null && data!==undefined && !data.error && h(renderData, {data}))
         || (data !==null && data===undefined && nothingfoundmessage());
 };

 function sleeper(ms) {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }

  function nothingfoundmessage(){
      return h("div", {class:"divider"}, 
    h("img", {src:nothingfound}, null),
    h("div", {class:"divider"},),
    h("p",{class:"copy"}, "Nothing found here but me...."),
    h("p",{class:"copy"}, "Try something else!"),
    h("div", {class:"divider"},),
    <Link to="/chooseHero"><Button className="button" variant="btn btn-warning btn-lg">Back to search</Button></Link>
    )
  }