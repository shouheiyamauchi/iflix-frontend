import API from 'config/api';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        onChange: ((targetPage, pageSize) => {this.openPage(targetPage, this.state.paginationConfig.pageSize)}),
        showSizeChanger: true,
        onShowSizeChange: ((targetPage, pageSize) => {this.openPage(targetPage, pageSize)})
      }
    };
  }

  componentDidMount() {
    this.openPage(1, this.state.paginationConfig.pageSize);
  }

  openPage = (targetPage, newPageSize, apiCallRequired) => {
    if (this.apiCallRequired(targetPage, newPageSize, apiCallRequired)) {
      this.contentListApiCall(targetPage, newPageSize);
    } else {
      this.switchPage(targetPage);
    };
  }

  apiCallRequired = (targetPage, newPageSize, overrideRequired) => {
    return (overrideRequired || !this.state.contents[targetPage] || newPageSize !== this.state.paginationConfig.pageSize);
  }

  switchPage = targetPage => {
    this.setState(update(this.state, {
      paginationConfig: {
        current: { $set: targetPage }
      }
    }));
  }

  contentListApiCall = (targetPage, newPageSize) => {
    this.setState({ contentLoading: true });

    const params = querystring.stringify({
      pageNo: targetPage,
      resultsPerPage: newPageSize,
      includeRating: true
    });

    axios.get(API.endpoint + 'contents?' + params)
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
        this.setState({ contentLoading: false });
        console.log(error);
      });
  }

  generateContentsObject = contentsListData => {
    // keep or reset previously loaded data based on check
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

    const {
      userData
    } = this.props;

    const contentSummaryProps = {
      userData,
      openPage: () => this.openPage(this.state.paginationConfig.current, this.state.paginationConfig.pageSize, true)
    };

    return (
      <div className={styles.listContainer}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={paginationConfig}
          dataSource={contents[paginationConfig.current]}
          loading={contentLoading}
          renderItem={content => (
            <ContentSummary content={content} {...contentSummaryProps} />
          )}
        />
      </div>
    );
  }
}

ContentList.propTypes = {
  userData: PropTypes.object
}

export default ContentList;
