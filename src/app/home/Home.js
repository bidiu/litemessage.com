import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Navbar from './navbar/Navbar';
import Chain from './chain/Chain';

import './Home.css';

class Home extends Component {
  render() {
    let { blocks, chain } = this.props;
    let blocklist = chain.map(hash => blocks[hash]);

    return (
      <div className="Home">
        <Navbar />
        <Chain blocklist={blocklist} />
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    blocks: state.blockchain.blocks,
    chain: state.blockchain.chain
  }),
  dispatch => ({})
)(Home));
