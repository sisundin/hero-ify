import React from "react";
import spin from "./spinner_highres.gif";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const h = React.createElement;

export default function RenderPromise({ promise, renderData }) {
  
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setData(null);
    console.log(promise);
    promise
      .then((x) => { 
      console.log("renderplaylist output:");
      console.log(x); 
      setData(x); })
      .catch((err) => setData({ error: err }));
  }, [promise]); // TODO: return cancel promise on unmount

  return (data === null && WhileRendering()) || (data !== null && !data.error && h(renderData, { data })) || (data !== null && data.error && NothingFoundMessage())
  
}

function NothingFoundMessage() {
  return h("div",{ className: "creatingPlaylist" },
    h("h1", { class: "copy" }, "Something must have gone terrably wrong...."),
    <Link to="/">
            <Button
              className="button"
              variant="btn btn-warning btn-lg"
              onClick={() => {
                
              }}
            >
              Try again!
            </Button>
          </Link>,
    h("div", { class: "divider" })
  );
}

function WhileRendering() {
  return h("div",{ className: "creatingPlaylist" },
    h("img", { className: "spinner-gif", src: spin }),
    h("h1", {}, "This is not as easy as you think...")
  );
}
