import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    user: {},
    loading: false,
    isDisabled: true,
    name: '',
    email: '',
    image: '',
    description: '',
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const userInfos = await getUser();

    this.setState({
      user: userInfos,
      loading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.enabledButton();
    });
  }

  verificaEmail = () => {
    const { email } = this.state;
    const checado = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    return checado;
  }

  enabledButton = () => {
    const { name, description, image } = this.state;
    if (this.verificaEmail() && name && description && image) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  salvarInformacoes = async () => {
    const { history: { push } } = this.props;
    const { name, email, image, description } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
    };
    this.setState({
      loading: true,
    });
    await updateUser(obj);
    push('/profile');
  }

  render() {
    const { loading, user, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />

        {
          loading ? <Loading /> : (
            <form action="">
              <input
                type="text"
                name="name"
                defaultValue={ user.name }
                id=""
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
              <input
                type="email"
                name="email"
                defaultValue={ user.email }
                id=""
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
              <textarea
                name="description"
                defaultValue={ user.description }
                id=""
                cols="30"
                rows="10"
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />
              <input
                type="text"
                name="image"
                defaultValue={ user.image }
                id=""
                data-testid="edit-input-image"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.salvarInformacoes }
              >
                Editar perfil

              </button>
            </form>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
