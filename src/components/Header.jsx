// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../style/header.css';

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
      <header data-testid="header-component" className="header">
        <h3 data-testid="header-user-name" className="user">
          {
            loading ? <Loading /> : <h3>{ `Bem vindo ${nameUser}!!` }</h3>
          }

        </h3>
        <nav className="nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link"
          >
            Pesquisar

          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            Musicas Favoritas

          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link"
          >
            Perfil

          </Link>
        </nav>
      </header>
    );
  }
}
