import React, { Component } from 'react';

import Header from '../header';
import Footer from '../footer';

import './styles.css';
class Layout extends Component {
  render() {
    return (
      <div className='content'>
        <div className='header'>
          <Header />
        </div>
        <div className='main'>{this.props.children}</div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
