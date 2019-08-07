import React, { Component } from "react";
import api from "../../services/api/pokemon";

import "./styles.css";

export default class Pokemon extends Component {
  state = {
    pokemon: [],
    pokemonImgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
    evolutionChain: []
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.getPokemon(id);
  }

  getPokemon = async (id, hasEvo) => {
    const response = await api.get(`/pokemon/${id}`);
    const specieResponse = await api.get(`/pokemon-species/${id}`);

    if (!hasEvo) {
      const evoResponse = await api.get(specieResponse.data.evolution_chain.url);
      var evoChain = [];
      var evoData = evoResponse.data.chain;
      do {
        let numberOfEvolutions = evoData["evolves_to"].length;
        var evoDetails = evoData["evolution_details"][0];

        evoChain.push({
          species_name: evoData.species.name,
          species_id: evoData.species.url.split("/")[6],
          min_level: !evoDetails ? 1 : evoDetails.min_level,
          trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          item: !evoData ? null : evoData.item
        });

        if (numberOfEvolutions > 1) {
          for (let i = 1; i < numberOfEvolutions; i++) {
            evoChain.push({
              species_name: evoData.evolves_to[i].species.name,
              species_id: evoData.evolves_to[i].species.url.split("/")[6],
              min_level: !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].min_level,
              trigger_name: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i]["evolution_details"][0].trigger.name,
              item: !evoData.evolves_to[i]["evolution_details"][0].item
                ? null
                : evoData.evolves_to[i]["evolution_details"][0].item.name,
              location: !evoData.evolves_to[i]["evolution_details"][0].location
                ? null
                : evoData.evolves_to[i]["evolution_details"][0].location.name
            });
          }
        }
        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      this.setState({ evolutionChain: evoChain });
    }
    this.setState({ pokemon: response.data });
  };

  getEvolutionChain = () => {
    const { evolutionChain, pokemonImgUrl } = this.state;
    return evolutionChain.map((evo, index) => {
      return (
        <div key={evo.species_id}>
          <span className="item-name text-center">{`#${evo.species_id} - ${
            evo.species_name
          }`}</span>
          <div className="evolution-step">
            <div className="evolution-card-wrapper">
              <div className="evolution-card" onClick={() => this.getPokemon(evo.species_id, true)}>
                <img src={`${pokemonImgUrl + evo.species_id}.png`} alt={evo.species_name} />
              </div>
              <div className="text-center">
                {evo.item
                  ? evo.item.split("-").join(" ")
                  : evo.min_level && evo.min_level !== 1
                  ? "Lvl " + evo.min_level
                  : evo.location
                  ? "LvlUp on " + evo.location
                  : ""}
              </div>
            </div>
            <div>{index !== evolutionChain.length - 1 ? <div>→</div> : ""}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { pokemon } = this.state;
    return (
      <div className="detail-content">
        <div className="detail-card">
          <div className="detail-card-header">
            <h1 className="item-name">
              #{pokemon.id} - {pokemon.name}
            </h1>
            <div className="types">
              {pokemon.types
                ? pokemon.types.reverse().map(type => (
                    <div key={type.type.name} className={`type ${type.type.name}-type`}>
                      <span>{type.type.name}</span>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="detail-body">
            <div className="detail-images">
              <div className="detail-pokemon-img">
                <img src={pokemon.sprites ? pokemon.sprites.front_default : ""} alt={pokemon.name}/>
              </div>
            </div>
            <div className="evolution-chain">{this.getEvolutionChain()}</div>
          </div>
        </div>
      </div>
    );
  }
}
