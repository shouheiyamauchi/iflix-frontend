import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import update from 'immutability-helper';
import { List, } from 'antd';
import ContentSummary from './components/ContentSummary'
import styles from './styles.module.scss';

class ContentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentLoading: true,
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
    this.setState({ contentLoading: true });

    const params = querystring.stringify({
      pageNo: targetPage,
      resultsPerPage: newPageSize,
      includeRating
    });

    axios.get('http://localhost:3001/api/v1/contents?' + params)
      .then(response => {
        const contentsListData = response.data.data;
        const contents = this.generateContentsObject(contentsListData);

        this.setState(update(this.state, {
          contentLoading: { $set: false },
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
      contentLoading
    } = this.state;

    return (
      <div className={styles.listContainer}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={paginationConfig}
          dataSource={contents[paginationConfig.current]}
          loading={contentLoading}
          renderItem={content => (
            <ContentSummary content={content} />
          )}
        />
      </div>
    );
  }
}

export default ContentList;
