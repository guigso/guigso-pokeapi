import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <small>
          Made by{' '}
          <a href='https://github.com/guigso' target='blank'>
             Guigso
          </a>
          . All content is © Nintendo, Game Freak, and The Pokémon Company.
        </small>
      </div>
    );
  }
}

export default Footer;
