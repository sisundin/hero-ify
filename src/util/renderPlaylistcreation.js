import React from "react";
import spin from "./spinner_highres.gif";

const h = React.createElement;

export default function RenderPromise({ functionToRender, renderData }) {
  
  const promise = new Promise(function(resolve, reject) {
    if(functionToRender!== "error"){
      resolve(functionToRender);
    }
    else{
      
    reject();
    }
  });
  
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setData(null);
    promise
      .then((x) => {console.log(x); setData(x)})
      .catch((err) => setData({ error: err }));
  }, [promise]); // TODO: return cancel promise on unmount

  return (data === null && WhileRendering()) 
    || (data !== null && !data.error && h(renderData, { data })) 
    || (data !== null && data.error && NothingFoundMessage())
  
}

function NothingFoundMessage() {
  return h("div",{ className: "creatingPlaylist" },
    h("h1", { class: "copy" }, "Something must have gone terrably wrong...."),
    h("h1", { class: "copy" }, "TRY AGAIN!"),
    h("div", { class: "divider" })
  );
}

function WhileRendering() {
  return h("div",{ className: "creatingPlaylist" },
    h("img", { className: "spinner-gif", src: spin }),
    h("h1", {}, "This is not as easy as you think...")
  );
}
