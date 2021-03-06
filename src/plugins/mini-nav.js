import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MiniNav extends React.PureComponent {
  static propTypes = {
  }
  state = {};
  render() {
    const { activeRouteIdx, routers } = this.props;
    return (
      <div className="mini-nav">
        {routers[activeRouteIdx]}
      </div>
    );
  }
}
