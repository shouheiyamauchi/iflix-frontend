import React, { Component } from 'react';

class Content extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        {match.params.id}
        You are logged in
      </div>
    );
  }
}

export default Content;
