import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <div className='nav-bar'>
        <span>
          <Link to='/'>HOME </Link>
        </span>

        <span>
          <Link to='/pokedex'> POKEDEX</Link>
        </span>
      </div>
    );
  }
}

export default Header;
