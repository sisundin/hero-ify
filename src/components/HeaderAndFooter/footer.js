import React from 'react';

const h = React.createElement;

    export default class Footer extends React.Component {
        constructor () {
          super();
          
          this.state = {};
        }
        render() {
          return h("table", {className:"footer"},
          h("tbody", {}, h("tr", {}, h("th", {className:"footer"}, "LEGAL"), h("th", {className:"footer"}, "PRIVACY"),  h("th", {className:"footer"}, "COOKIES"), h("th", {className:"footer"}, "© 2020 Hero-Ify AB"), h("th", {className:"footer"}, "SWEDEN"))),
          );
        }
    }