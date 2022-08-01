// import PropTypes from 'prop-types'
import React, { Component } from 'react';
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
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        header
        <p data-testid="header-user-name">{ nameUser }</p>
      </header>
    );
  }
}
