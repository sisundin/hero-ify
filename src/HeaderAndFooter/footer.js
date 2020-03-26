import React from 'react';

const h = React.createElement;

    export default class Footer extends React.Component {
        constructor () {
          super();
          
          this.state = {};
        }
        render() {
          return h("div", {className:"footer"}, h("div",{className:"divider"},null ),
          h("table", {className:"footer"},
          h("tr", {}, h("th", {}, "LEGAL"), h("th", {}, "PRIVACY"),  h("th", {}, "COOKIES"), h("th", {}, "© 2020 Hero-Ify AB"), h("th", {}, "SWEDEN")),
          h("div",{className:"divider"},null )));
        }
    }