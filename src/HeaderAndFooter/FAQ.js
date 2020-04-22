import React from 'react';

export default class Faq extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>FAQ</h1>
            <p></p>
          <button onClick={this.props.closeFAQ}>close</button>
          </div>
        </div>
      );
    }
  }
