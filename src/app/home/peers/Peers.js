import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import DotSpinner from '../../common/ui/dot-spinner/DotSpinner';
import randomColor from 'randomcolor';
import { pickColor } from '../../utils/colorUtils';
import { peersChanged } from '../../utils/blockchainUtils';

import './Peers.css';

class Peers extends Component {
  constructor(props) {
    super(props);
    this.state = { showSpinner: true };
  }

  componentDidMount() {
    window.$('.ps-carousel').on('init', () => {
      
      setTimeout(() => {
        let { peers } = this.props;
        
        this.setState({ showSpinner: false });
        this.repopulateCarousel(peers);
      }, 1000)
    });

    window.$('.ps-carousel').slick({
      dots: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      accessibility: false,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
      ]
    });
  }

  repopulateCarousel(peers) {
    // clear the carousel first (for simiplicity)
    window.$('.ps-carousel').slick('slickRemove', null, null, true);

    // populate it again
    for (let peer of peers) {
      let background = randomColor();
      let color = pickColor(['#000000', '#ffffff'], { background });

      window.$('.ps-carousel').slick('slickAdd', 
        `<div class="Peer">` + 
          `<div class="peer-icon font-tiny" style="background-color: ${background}; color: ${color}">` +
            `${peer.type === 'full' ? 'fullnode' : 'thinnode'}` +
          `</div>` +
          `<div class="peer-item peer-uuid font-small text-truncate">` +
            `${peer.uuid}` +
          `</div>` +
          `<div class="peer-item font-small text-truncate">` +
            `${peer.remoteAddr}` +
          `</div>` +
        `</div>`
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { peers: prevPeers } = prevProps;
    let { peers } = this.props;

    if (peersChanged(prevPeers, peers)) {
      this.repopulateCarousel(peers);
    }
  }

  componentWillUnmount() {
    window.$('.ps-carousel').slick('unslick');
  }

  render() {
    let { peers } = this.props;
    let { showSpinner } = this.state;

    return (
      <div className="Peers">
        <h1 className="ps-head">Connected Peers</h1>
        <div className="ps-body">
          <div className="ps-carousel"></div>
          {(!peers.length || showSpinner) && (
            <div className="ps-spinner-container">
              <DotSpinner />
              <div>
                Loading peers... please wait
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    peers: state.blockchain.peers
  }),
  dispatch => ({})
)(Peers));
