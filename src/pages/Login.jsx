import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      digiteSeuNome: '',
      disabledButton: true,
      loading: false,
    };
  }

  attEstadoEAtivaBotao = ({ target }) => {
    if (target.value.length > 2) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
    this.setState({
      digiteSeuNome: target.value,
    });
  }

  saveName = async () => {
    this.setState({
      loading: true,
    });
    const { digiteSeuNome } = this.state;
    const obj = { name: digiteSeuNome };
    await createUser(obj);
    const { history: { push } } = this.props;
    push('./search');
  }

  render() {
    const { disabledButton, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="digiteSeuNome">
            Digite seu nome:
            <input
              type="text"
              name="digiteSeuNome"
              id="digiteSeuNome"
              data-testid="login-name-input"
              onChange={ this.attEstadoEAtivaBotao }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabledButton }
            onClick={ this.saveName }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
