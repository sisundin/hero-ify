import React from "react";
import nothingfound from "./nothingfound.gif";
import spin from "./thinkingbatman.gif";

const h = React.createElement;

export default function RenderPlaylistCreation({ exicutor, renderData }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setData(null);

    new Promise((resolve, reject) => {
      resolve(exicutor);
      reject("something went wrong");
    })
      .then((x) => setData(x))
      .catch((err) => setData({ error: err }));
  }, [exicutor]); // TODO: return cancel promise on unmount

  return (
    (data === null && Whilerendering) ||
    (data !== null &&
      data !== undefined &&
      !data.error &&
      h(renderData, { data })) ||
    (data !== null && data === undefined && nothingfoundmessage())
  );
}

function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function nothingfoundmessage() {
  return h(
    "div",
    { class: "Herocard" },
    h("div", { class: "divider" }),
    h("img", { src: nothingfound }, null),
    h("div", { class: "divider" }),
    h("p", { class: "copy" }, "Something must have gone terrably wrong...."),
    h("p", { class: "copy" }, "TRY AGAIN!"),
    h("div", { class: "divider" })
  );
}

function Whilerendering() {
  h(
    "div",
    { className: "creatingPlaylist" },
    h("img", { src: spin }),
    h("h1", {}, "This is not as easy as you think...")
  );
}
