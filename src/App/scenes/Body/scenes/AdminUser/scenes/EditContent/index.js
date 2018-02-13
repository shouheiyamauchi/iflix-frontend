import API from 'config/api';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import querystring from 'querystring';
import { Spin } from 'antd';
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
      contentLoadingError: false,
      submittingContentForm: false,
      redirectPage: '',
    }
  }

  componentDidMount() {
    if (!this.newContent()) this.getContentApiCall();
  }

  newContent = () => {
    return this.props.match.params.id === 'new'
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

  handleSubmit = e => {
    e.preventDefault();

    if (this.formValidation()) {
      this.setState({ submittingContentForm: true });

      const params = querystring.stringify(
        update(this.state.contentData, {
          releaseDate: {$set: this.state.contentData.releaseDate.toString()}
        })
      );

      const authHeaders = { headers: { 'Authorization': 'JWT ' + this.props.userData.token } }

      this.newContent() ? this.createContentApiCall(params, authHeaders) : this.editContentApiCall(params, authHeaders);
    };
  };

  formValidation = () => {
    const validationMessages = {
      title: '',
      description: '',
      genre: '',
      releaseDate: '',
      thumbnail: ''
    };

    Object.keys(validationMessages).map(fieldName => {
      if (!this.state.contentData[fieldName]) validationMessages[fieldName] = fieldName + ' cannot be blank';
    });

    this.setState({ validationMessages });

    return !validationMessages.title && !validationMessages.description && !validationMessages.genre &&
      !validationMessages.releaseDate && !validationMessages.thumbnail
  }

  createContentApiCall = (params, authHeaders) => {
    axios.post(API.endpoint + 'contents?' + params, {} , authHeaders)
      .then(response => {
        this.setState({
          redirectPage: '/contents/' + response.data.data._id,
          submittingContentForm: false
        });
      })
      .catch(error => {
        this.setState({ submittingContentForm: false });
        console.log(error);
      })
  }

  editContentApiCall = (params, authHeaders) => {
    axios.put(API.endpoint + 'contents/' + this.props.match.params.id + '?' + params, {} , authHeaders)
      .then(response => {
        this.setState({
          redirectPage: '/contents/' + response.data.data._id,
          submittingContentForm: false
        });
      })
      .catch(error => {
        this.setState({ submittingContentForm: false });
        console.log(error);
      })
  }

  render() {
    const {
      loadingContent,
      contentData,
      validationMessages,
      contentLoadingError,
      redirectPage,
      submittingContentForm
    } = this.state;

    const contentFormProps = {
      loadingContent,
      contentData,
      validationMessages,
      contentLoadingError,
      handleInput: this.handleInput,
      handleDateInput: this.handleDateInput,
      handleSubmit: this.handleSubmit,
      submittingContentForm
    };

    return (
      <div>
        {redirectPage && <Redirect push to={redirectPage} />}
        <ContentForm {...contentFormProps} />
      </div>
    );
  }
}

EditContent.propTypes = {
  userDate: PropTypes.object
}

export default EditContent;
