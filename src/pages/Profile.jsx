// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    user: {},
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const infosUser = await getUser();

    this.setState({
      user: infosUser,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />

        {
          loading ? <Loading /> : (
            <div>
              <img
                src={ user.image }
                data-testid="profile-image"
                alt={ user.name }
              />
              <Link to="/profile/edit">Editar perfil</Link>
              <h3>{user.name}</h3>
              <h3>{user.email}</h3>
              <h3>{user.description}</h3>
            </div>
          )
        }

      </div>
    );
  }
}
