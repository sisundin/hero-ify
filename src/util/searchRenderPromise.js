import React from 'react';

import spin from './spinner.gif'

const h = React.createElement;

export default function SearchRenderPromise({promise, renderData}){

    const [data, setData]=React.useState(null);
    React.useEffect(()=>{setData(null);
          promise.then(x=>setData(x))
                 .catch(err=>setData({error:err}));
    }, [promise]);  // TODO: return cancel promise on unmount
 
    return  (data===null && h("img", {src:spin}))
         || (data !==null && data!==undefined && !data.error && h(renderData, {data}))
         || (data !==null && data==undefined && h("div", {}, "Oops, not found..."));
 };