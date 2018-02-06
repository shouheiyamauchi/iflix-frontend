import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import moment from 'moment';
import { List } from 'antd';

const { Item } = List;

const pagination = {
  pageSize: 10,
  current: 1,
  total: 10,
  onChange: (() => {}),
};

class ContentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: []
    };
  }

  componentDidMount() {
    this.getContents(1, 10, true);
  }

  getContents = (pageNo, resultsPerPage, includeRating) => {
    axios.get('http://localhost:3001/api/v1/contents', {
        params: {
          pageNo,
          resultsPerPage,
          includeRating
        }
      })
      .then(response => {
        this.setState({contents: response.data.data.docs})
        console.log(response.data.data.docs);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: '100vh' }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={pagination}
          dataSource={this.state.contents}
          renderItem={item => (
            <Item
              key={item.title}
              extra={<img width={150} alt="logo" src={item.thumbnail} />}
            >
              <h1>{item.title}</h1>
              {item.genre}
              <br />
              {moment(item.releaseDate).format('LL')}
              <br />
              <br />
              {item.description}
            </Item>
          )}
        />
      </div>
    );
  }
}

export default ContentList;
