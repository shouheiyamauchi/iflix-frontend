import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const ContentForm = props => {
  const {
    loadingContent,
    contentData,
    validationMessages,
    handleInput,
    handleDateInput
  } = props;

  const formIconStyle = { color: 'rgba(0,0,0,.25)' }

  const cardStyle = {
    width: '100%',
    borderRadius: '5px'
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
      md: { span: 4 },
      lg: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
      md: { span: 20 },
      lg: { span: 21 }
    },
  };

  return (
    <Card title={contentData.title} loading={loadingContent} bordered={false} style={cardStyle}>
      <Form>
        <FormItem
          {...formItemLayout}
          label="Title"
          validateStatus={validationMessages.title && 'error'}
          help={validationMessages.title}
        >
          <Input
            placeholder="Title"
            value={contentData.title}
            name="title"
            onChange={handleInput}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Description"
          validateStatus={validationMessages.description && 'error'}
          help={validationMessages.description}
        >
          <TextArea
            placeholder="Description"
            value={contentData.description}
            rows={4}
            name="description"
            onChange={handleInput}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Genre"
          validateStatus={validationMessages.genre && 'error'}
          help={validationMessages.genre}
        >
          <Input
            placeholder="Genre"
            value={contentData.genre}
            name="genre"
            onChange={handleInput}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Release Date"
          validateStatus={validationMessages.releaseDate && 'error'}
          help={validationMessages.releaseDate}
        >
          <DatePicker
            placeholder="Release Date"
            value={moment(contentData.releaseDate)}
            name="releaseDate"
            onChange={handleDateInput}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Thumbnail URL"
          validateStatus={validationMessages.thumbnail && 'error'}
          help={validationMessages.thumbnail}
        >
          <Input
            placeholder="Thumbnail URL"
            value={contentData.thumbnail}
            name="thumbnail"
            onChange={handleInput}
          />
        </FormItem>
      </Form>
    </Card>
  );
}

ContentForm.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleDateInput: PropTypes.func.isRequired,
  loadingContent: PropTypes.bool.isRequired,
  contentData: PropTypes.object.isRequired,
  validationMessages: PropTypes.object.isRequired
}

export default ContentForm;
