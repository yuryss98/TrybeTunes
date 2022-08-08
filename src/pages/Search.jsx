// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../style/search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      inputPesquisa: '',
      loading: false,
      nomePesquisado: '',
      resultadoDaPesquisa: [],
      pesquisaRetornouNada: '',
    };
  }

  enabledButton = ({ target }) => {
    const { value } = target;
    if (value.length > 1) {
      this.setState({
        isDisabled: false,
        inputPesquisa: value,
      });
    } else {
      this.setState({
        isDisabled: true,
        inputPesquisa: value,
      });
    }
  }

  pesquisar = async () => {
    const { inputPesquisa, resultadoDaPesquisa } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(inputPesquisa);
    this.setState({
      loading: false,
      nomePesquisado: inputPesquisa,
      inputPesquisa: '',
      resultadoDaPesquisa: response,
    }, () => {
      if (resultadoDaPesquisa.length === 0) {
        this.setState({
          pesquisaRetornouNada: 'Nenhum álbum foi encontrado',
        });
      }
    });
  }

  render() {
    const {
      isDisabled,
      inputPesquisa,
      loading,
      nomePesquisado,
      resultadoDaPesquisa,
      pesquisaRetornouNada,
    } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search" className="search">
        <Header />
        <form className="formSearch">
          <h2>Pesquisar Albuns:</h2>
          <input
            type="text"
            value={ inputPesquisa }
            name="pesquisarBanda"
            placeholder="Digite o nome do Artista ou Banda"
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
        {
          nomePesquisado.length > 0
          && <h3 className="h3Search">{`Albuns de  ${nomePesquisado}:`}</h3>
        }
        <div className="cardsMusics">
          {
            resultadoDaPesquisa.length > 0
            && resultadoDaPesquisa.map((album) => (
              <div className="albunsEncontrados" key={ album.collectionId }>
                <p>{`Nome do Album: ${album.collectionName}`}</p>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Ir para o Álbum
                </Link>
              </div>
            ))
          }
        </div>

        {
          !resultadoDaPesquisa.length && <p>{pesquisaRetornouNada}</p>
        }
      </div>
    );
  }
}
