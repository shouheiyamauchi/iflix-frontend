import API from 'config/api';
import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import querystring from 'querystring';
import ContentForm from './components/ContentForm';

class EditContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingContent: false,
      contentData: {
        title: '',
        description: '',
        genre: '',
        releaseDate: '',
        thumbnail: ''
      },
      validationMessages: {
        title: '',
        description: '',
        genre: '',
        releaseDate: '',
        thumbnail: ''
      },
      contentLoadingError: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') this.getContentApiCall();
  }

  getContentApiCall = () => {
    this.setState({ loadingContent: true });

    axios.get(API.endpoint + 'contents/' + this.props.match.params.id)
      .then(response => {
        const contentData = response.data.data;

        this.setState({
          loadingContent: false,
          contentData
        });
      })
      .catch(error => {
        this.setState({
          loadingContent: false,
          contentLoadingError: true
        });
      });
  }

  handleInput = e => {
    this.setState(update(this.state, {
      contentData: {
        [e.target.name]: { $set: e.target.value }
      }
    }));
  }

  handleDateInput = (date, dateString) => {
    this.setState(update(this.state, {
      contentData: {
        releaseDate: { $set: date.toDate() }
      }
    }));
  }

  render() {
    const {
      loadingContent,
      contentData,
      validationMessages
    } = this.state;

    const contentFormProps = {
      loadingContent,
      contentData,
      validationMessages,
      handleInput: this.handleInput,
      handleDateInput: this.handleDateInput
    };

    return (
      <ContentForm {...contentFormProps} />
    );
  }
}

export default EditContent;
