import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import moment from 'moment';
import { List } from 'antd';
import styles from './styles.module.scss';

const { Item } = List;

class ContentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      contents: {},
      paginationConfig: {
        current: 0,
        pageSize: 10,
        total: 0,
        onChange: ((targetPage, pageSize) => {this.changePage(targetPage, this.state.paginationConfig.pageSize, true)}),
        showSizeChanger: true,
        onShowSizeChange: ((targetPage, pageSize) => {this.changePage(targetPage, pageSize, true)})
      }
    };
  }

  componentDidMount() {
    this.changePage(1, this.state.paginationConfig.pageSize, true);
  }

  changePage = (targetPage, newPageSize, includeRating) => {
    if (this.apiCallRequired(targetPage, newPageSize)) {
      this.contentListApiCall(targetPage, newPageSize, includeRating);
    } else {
      this.switchPage(targetPage);
    };
  }

  apiCallRequired = (targetPage, newPageSize) => {
    return (!this.state.contents[targetPage] || newPageSize !== this.state.paginationConfig.pageSize);
  }

  switchPage = targetPage => {
    this.setState(update(this.state, {
      paginationConfig: {
        current: { $set: targetPage }
      }
    }));
  }

  contentListApiCall = (targetPage, newPageSize, includeRating) => {
    this.setState({ loading: true });

    axios.get('http://localhost:3001/api/v1/contents', {
        params: {
          pageNo: targetPage,
          resultsPerPage: newPageSize,
          includeRating
        }
      })
      .then(response => {
        const contentsListData = response.data.data
        const contents = this.generateContentsObject(contentsListData)

        this.setState(update(this.state, {
          loading: { $set: false },
          paginationConfig: {
            current: { $set: contentsListData.page },
            pageSize: { $set: contentsListData.limit },
            total: { $set: contentsListData.total }
          },
          contents: { $set: contents }
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateContentsObject = contentsListData => {
    if (this.contentRefreshRequired(contentsListData)) {
      return {
        [contentsListData.page]: contentsListData.docs
      }
    } else {
      return update(this.state.contents, {
        [contentsListData.page]: { $set: contentsListData.docs }
      });
    };
  }

  contentRefreshRequired = contentsListData => {
    // checking if a refresh of cached content is required due to new contents, or a change in number of contents displayed per page
    return (this.state.paginationConfig.total !== contentsListData.total || this.state.paginationConfig.pageSize !== contentsListData.limit);
  }

  render() {
    const {
      paginationConfig,
      contents,
      loading
    } = this.state

    return (
      <div className={styles.listContainer}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={paginationConfig}
          dataSource={contents[paginationConfig.current]}
          loading={loading}
          renderItem={item => (
            <Item
              key={item.title}
              extra={<img style={{width: 150, marginBottom: 10, borderRadius: 5, filter: 'drop-shadow(5px 5px 6px #acacac)'}} alt="logo" src={item.thumbnail} />}
            >
              <h1>{item.title}</h1>
              {item.genre}
              <br />
              Rating: {item.averageRating || 'N/A'}
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
