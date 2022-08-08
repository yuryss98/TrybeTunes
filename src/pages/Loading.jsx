import React, { Component } from 'react';
import '../style/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div>
        <i className="fa-solid fa-spinner" />
      </div>
    );
  }
}
