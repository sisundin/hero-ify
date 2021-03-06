import React from "react";
import spin from "./spinner_highres.gif";

const h = React.createElement;

export default function RenderPromise({ promise, renderData }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setData(null);
    promise
      .then(sleeper(1000))
      .then((x) => setData(x))
      .catch((err) => setData({ error: err }));
  }, [promise]); // TODO: return cancel promise on unmount

  return (
    (data === null && h("img", { src: spin, className: "spinner-gif"})) ||
    (data !== null && !data.error && h(renderData, { data })) ||
    (data !== null && data.error && h("div", {}, data.error.toString()))
  );
}

function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}
