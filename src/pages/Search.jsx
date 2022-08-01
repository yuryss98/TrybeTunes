// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
    };
  }

  enabledButton = ({ target }) => {
    const { value } = target;
    if (value.length > 1) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="pesquisarBanda"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.enabledButton }
          />
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="search-artist-button"
            onClick={ this.pesquisar }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
