import React, { Component } from 'react';
import api from '../../services/api/pokemon';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Pokemon extends Component {
  state = {
    pokemon: [],
    pokemonImgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get(`/pokemon/${id}`);
    this.setState({ pokemon: response.data });
  }
  render() {
    const { pokemon, pokemonImgUrl } = this.state;
    return (
      <div className='detail-content'>
        <div className='detail-card'>
          <div className='detail-card-header'>
            <h1 className='item-name'>
              #{pokemon.id} - {pokemon.name}
            </h1>
            <div className='types'>
              {pokemon.types
                ? pokemon.types.reverse().map(type => (
                    <div key={type.type.name} className={`type ${type.type.name}-type`}>
                      <span>{type.type.name}</span>
                    </div>
                  ))
                : ''}
            </div>
          </div>
          <div className='detail-images'>
            <div className='detail-pokemon-img'>
              <img src={pokemon.sprites ? pokemon.sprites.front_default : ''} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
