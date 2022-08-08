import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/profileEdite.css';

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
            <form action="" className="editProfileForm">
              <div className="divForm">
                <div className="divInputs">
                  <div>
                    <h3>Nome</h3>
                    <input
                      type="text"
                      name="name"
                      defaultValue={ user.name }
                      id=""
                      data-testid="edit-input-name"
                      onChange={ this.handleChange }
                    />
                    <h3>Email</h3>
                    <input
                      type="email"
                      name="email"
                      defaultValue={ user.email }
                      id=""
                      data-testid="edit-input-email"
                      onChange={ this.handleChange }
                    />
                    <h3>Descrição</h3>
                    <input
                      className="descricao"
                      type="text"
                      name="description"
                      defaultValue={ user.description }
                      id=""
                      onChange={ this.handleChange }
                      data-testid="edit-input-description"
                    />
                    <h3>Imagem de perfil</h3>
                    <input
                      type="text"
                      name="image"
                      defaultValue={ user.image }
                      id=""
                      data-testid="edit-input-image"
                      onChange={ this.handleChange }
                    />
                  </div>
                  <div>
                    <button
                      className="salvarProfile"
                      type="button"
                      data-testid="edit-button-save"
                      disabled={ isDisabled }
                      onClick={ this.salvarInformacoes }
                    >
                      Editar perfil

                    </button>
                  </div>

                </div>
              </div>
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
