import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import moment from 'moment';
import { List } from 'antd';

const { Item } = List;

class ContentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      contents: {},
      resultsPerPage: 10,
      paginationConfig: {}
    };
  }

  componentDidMount() {
    this.getContents(1, this.state.resultsPerPage, true);
  }

  getContents = (pageNo, resultsPerPage, includeRating) => {
    this.setState({ loading: true });

    axios.get('http://localhost:3001/api/v1/contents', {
        params: {
          pageNo,
          resultsPerPage,
          includeRating
        }
      })
      .then(response => {
        const contentsListData = response.data.data

        // use immutability-helper
        const paginationConfig = {
          current: contentsListData.page,
          pageSize: resultsPerPage,
          total: contentsListData.total,
          onChange: ((page, pageSize) => {this.getContents(page, this.state.resultsPerPage, true)})
        }
        // check changes compared to last call to determine reloading previous data or not

        this.setState({
          loading: false,
          paginationConfig,
          contents: update(this.state.contents, {[contentsListData.page]: {$set: contentsListData.docs}})
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {
      paginationConfig,
      contents
    } = this.state

    return (
      // create CSS class
      <div style={{ background: '#fff', padding: 24, minHeight: '100vh' }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={this.state.paginationConfig}
          dataSource={contents[paginationConfig.current]}
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
