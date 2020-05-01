import React from "react";
import nothingfound from "./nothingfound.gif";
import spin from "./herospinner.gif";

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

  return (
    (data === null && h("img", { src: spin })) ||
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
    h("p", { class: "copy" }, "Nothing found on this search but me...."),
    h("p", { class: "copy" }, "TRY AGAIN!"),
    h("div", { class: "divider" })
  );
}
