import React from 'react';
import RenderPromise from '../util/renderPromise.js';
import { Button, Table } from 'react-bootstrap'

const h = React.createElement;


export default function LatestPlaylist(props){
        
    React.useEffect(() => {
         
        
        }, [props]);
        
      
        return h("div", {className:"othersPlaylistsTable"}, 
        
        <RenderPromise
        promise = {props.model.getOthersPlaylistsfromdatabase(9)}
        renderData = { ({data}) => rendertable(data)} 
        />,
        h("div", {className:"divider"}),
        <Button onClick= {() => {}}>Refresh</Button>
        );

        
    }
    
    function rendertable(data){
        return <Table>
            <tr><th>User</th><th>Hero</th><th>Link</th></tr>
            {data.map(playlistobject => 
        h("tr", {} , h("td", {}, playlistobject.User), h("td", {}, playlistobject.Hero), h("td", {}, h("a", {href:"playlistobject.PlaylistLink" , target:"_blank"}, playlistobject.PlaylistLink))))
        }
        </Table>
    }