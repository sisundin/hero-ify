import React from 'react';
import RenderPromise from '../util/renderPromise';
import {Table} from 'react-bootstrap'

const h = React.createElement;


export default function LatestPlaylist(props){

    React.useEffect(() => {


        }, [props]);


        return <div className='popup' >

        <div className='popup_inner_playlists'>
        <div className='popup-container'>
        <h1>Playlists created by others</h1>
        <RenderPromise
        promise = {props.model.getOthersPlaylistsfromdatabase(9)}
        renderData = { ({data}) => rendertable(data)}
        />
        <p className = "closeEx" onClick={props.closePlaylists}>x</p>
        </div>
        </div>
    </div>

    }

    function rendertable(data){
        return <Table variant="table table-borderless" className="playlistTable">
            <thead><tr><th>User</th><th>Hero</th><th>Link</th></tr></thead>
            {data.map(playlistobject =>
        h("tbody",{key:playlistobject.User}, h("tr", {} , h("td", {}, playlistobject.User), h("td", {}, playlistobject.Hero), h("td", {}, <a href={playlistobject.PlaylistLink} target="_blank" rel="noopener noreferrer"> {playlistobject.PlaylistLink}</a>))))
        }
        </Table>
    }
