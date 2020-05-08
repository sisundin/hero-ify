import React from "react";
import RenderPromise from "../util/renderPromise";
import { Button, Table } from "react-bootstrap";
import { ActionUpdate } from "material-ui/svg-icons";

const h = React.createElement;

export default function LatestPlaylist(props) {
  React.useEffect(() => {}, [props]);

  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="popup-container">
          <h1>Playlists created by others</h1>
          <RenderPromise
            promise={props.model.getOthersPlaylistsfromdatabase(9)}
            renderData={({ data }) => rendertable(data)}
          />
          <p className="closeEx" onClick={props.closePlaylists}>
            x
          </p>
        </div>
      </div>
    </div>
  );
}

function rendertable(data) {
  return (
    <Table class="table table-borderless" className="playlistTable">
      <thead>
        <tr>
          <th>User</th>
          <th>Hero</th>
          <th>Link</th>
        </tr>
      </thead>
      {data.map((playlistobject) =>
        h(
          "tr",
          {},
          h("td", {}, playlistobject.User),
          h("td", {}, playlistobject.Hero),
          h(
            "td",
            {},
            <a href={playlistobject.PlaylistLink} target="_blank">
              {" "}
              {playlistobject.PlaylistLink}
            </a>
          )
        )
      )}
    </Table>
  );
}
