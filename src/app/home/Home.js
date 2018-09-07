import React, { Component } from 'react';
import Navbar from './navbar/Navbar';

import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Navbar />
      </div>
    );
  }
}

export default Home;
