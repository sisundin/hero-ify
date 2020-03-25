import React from 'react';
import RenderPromise from '../util/renderPromise.js';

const h = React.createElement;


export default function LatestPlaylist(props){
        
    React.useEffect(() => {
         
        
        }, [props]);
        
      
        return h("div", {className:"othersPlaylistsTable"}, 
        
        <RenderPromise
        promise = {props.model.getOthersPlaylistsfromdatabase(9)}
        renderData = { ({data}) => rendertable(data)} 
        />
        );

        
    }
    
    function rendertable(data){
        return  h("table",{},
    h("tr", {},  h("th", {}, "User"), h("th", {}, "Hero"), h("th", {}, "Link")), 
    data.map(playlistobject => 
        h("tr", {} , h("td", {}, playlistobject.User), h("td", {}, playlistobject.Hero), h("td", {}, playlistobject.PlaylistLink)))
        );
    }