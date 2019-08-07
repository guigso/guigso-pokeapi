import React, { Component } from "react";
import api from "../../services/api/pokemon";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Pokedex extends Component {
  state = {
    pokemons: [],
    generation: 1,
    pokemonImgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  };

  componentDidMount() {
    this.loadGeneration();
  }

  loadGeneration = async (generation = 1) => {
    var response = await api.get(`/generation/${generation}`);
    response = this.orderByPokemonId(response.data.pokemon_species);
    this.setState({ pokemons: response, generation });
  };

  orderByPokemonId = array => {
    const sortAsc = (a, b) =>
      parseInt(a.url.split("/").slice(6)) - parseInt(b.url.split("/").slice(6));
    return array.sort(sortAsc);
  };

  prevGen = () => {
    const { generation } = this.state;
    if (generation === 1) return;
    const genNumber = generation - 1;
    this.loadGeneration(genNumber);
  };

  nextGen = () => {
    const { generation } = this.state;

    if (generation === 7) return;

    const genNumber = generation + 1;
    this.loadGeneration(genNumber);
  };

  openDetails = id => {
    console.log(id);
  };

  render() {
    const { pokemons, generation, pokemonImgUrl } = this.state;
    return (
      <div className="pokedex-content">
        <div className="pokedex-header">
          <h1>Pokedex</h1>{" "}
          <div className="actions">
            <button onClick={this.prevGen} disabled={generation === 1}>
              Prev.Gen.
            </button>
            <button onClick={this.nextGen} disabled={generation === 7}>
              Next Gen.
            </button>
          </div>
        </div>
        <div className="list">
          {pokemons.map(pokemon => (
            <div key={pokemon.name} className="list-item">
              <Link
                to={`/pokemon/${pokemon.url
                  .split("/")
                  .slice(6)
                  .join("")}`}>
                <span> #{pokemon.url.split("/").slice(6)} </span>
                <p className="item-name">{pokemon.name.split("-").join(" ")}</p>
                <img
                  loading="lazy"
                  src={
                    pokemonImgUrl +
                    pokemon.url
                      .split("/")
                      .slice(6)
                      .join("") +
                    ".png"
                  }
                  alt={pokemon.name.split("-").join(" ")}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
