// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.infos();
  }

  infos = async () => {
    const infosDoUsuario = await getUser();
    const { name } = infosDoUsuario;
    this.setState({
      nameUser: name,
      loading: false,
    });
  }

  render() {
    const { nameUser, loading } = this.state;

    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Musicas Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <h3 data-testid="header-user-name">
          {
            loading ? <Loading /> : nameUser
          }

        </h3>
      </header>
    );
  }
}
