import React from "react";
import spin from "./spinner_highres.gif";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const h = React.createElement;

export default function RenderPromise({ promise, renderData }) {
  
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setData(null);
    promise
      .then(sleeper(2000))
      .then((x) => setData(x))
      .catch((err) => setData({ error: err }));
  }, [promise]); // TODO: return cancel promise on unmount

  return (data === null && whileRendering()) 
  || (data !==null && !data.error && h(renderData))
  || (data !==null && data.error && nothingFoundMessage());
  
};

function nothingFoundMessage() {
  return h("div",{ className: "creatingPlaylist" },
  h("div", {className: "errorMessage"},
  h("div", { className: "divider" }, null),
    h("h1", { }, "Something must have gone terribly wrong...."),
    h("div", { className: "divider" }, null),
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
    h("div", { class: "divider" }))
  );
}

function whileRendering() {
  return h("div",{ className: "creatingPlaylist" },
  h("div", { className: "divider" }, null),
    h("img", { className: "spinner-gif", src: spin }),
    h("h1", {}, "Creating playlist... it's is not as easy as you think...")
  );
}

function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}