import React from 'react';
import nothingfound from './nothingfound.gif'
import spin from '../Assets/spinner_highres.gif'
import Back from "../components/HeaderAndFooter/Back.js"

const h = React.createElement;

export default function SearchRenderPromise({ promise, renderData }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setData(null);
    promise
      .then(sleeper(2000))
      .then((x) => setData(x))
      .catch((err) => setData({ error: err }));
  }, [promise]); // TODO: return cancel promise on unmount
 
    return  (data===null && h("img", {className:"spinner-gif", src:spin}))
         || (data !==null && data!==undefined && !data.error && h(renderData, {data}))
         || (data !==null && data===undefined && nothingfoundmessage());
 };

function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

  function nothingfoundmessage(){
      return h("div", {className:"divider"}, 
    h("img", {src:nothingfound}, null),
    h("div", {className:"divider"},),
    h("p",{className:"copy"}, "Nothing found here but me...."),
    h("p",{className:"copy"}, "Try something else!"),
    h("div", {className:"divider"},),
    <Back></Back>
    
    )
  }
