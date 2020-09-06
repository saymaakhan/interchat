import React from 'react'
import {Modal, Form, Row, Col, Input, Select, Tag, Tooltip} from 'antd'
import { PlusOutlined } from '@ant-design/icons';

class JobForm extends React.Component{
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    }

    // Skill tags
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }

        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }) => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;

        return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    saveInputRef = input => {
        this.input = input;
    };

    saveEditInputRef = input => {
        this.editInput = input;
    };

    
    // Render functions
    renderFormItem = (name, label, textArea=null, placeholder='') => {
        return (
            <Form.Item
                name={name}
                label={label}
                rules={[
                    { required: true, message: `Please enter a valid ${label}.` },
                ]}
            >
                {textArea? <Input.TextArea id={name} placeholder={placeholder}/> : <Input id={name} placeholder={placeholder}/> }  
            </Form.Item>
        )
    }

    renderDropdown = (name, label, options) => {
        return (
            <Form.Item
                name={name}
                label={label}
                rules={[
                    { required: true, message: `Please enter a valid ${label}.` },
                ]}
            >
                <Select>
                    {options.map(option => (
                        <Select.Option value={option}>{option}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
        )
    }

    renderSkills = () => {
        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;

        return (
            <>
              {tags.map((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={this.saveEditInputRef}
                      key={tag}
                      size="small"
                      className="tag-input"
                      value={editInputValue}
                      onChange={this.handleEditInputChange}
                      onBlur={this.handleEditInputConfirm}
                      onPressEnter={this.handleEditInputConfirm}
                    />
                  );
                }
      
                const isLongTag = tag.length > 20;
      
                const tagElem = (
                  <Tag
                    className="edit-tag"
                    key={tag}
                    closable={index !== 0}
                    onClose={() => this.handleClose(tag)}
                  >
                    <span
                      onDoubleClick={e => {
                        if (index !== 0) {
                          this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                            this.editInput.focus();
                          });
                          e.preventDefault();
                        }
                      }}
                    >
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag className="site-tag-plus" onClick={this.showInput}>
                  <PlusOutlined /> New Skill
                </Tag>
              )}
            </>
          )
    }

    render () {
        return (
            <Modal 
                title='Add Job'
                visible={this.props.showModal}
                onOk={() => this.props.handleOk(this.state.tags)}
                onCancel={this.props.handleCancel}
            >
                <Form ref={this.props.formRef} layout='vertical'>
                    <Row gutter={16}>
                        <Col span={12}>
                            {this.renderFormItem('title', 'Title')}
                        </Col>
                        <Col span={12}>
                            {this.renderFormItem('location', 'Location', false, 'ex. Los Angeles, CA, USA')}
                        </Col>
                    </Row> 
                                   
                    <Row gutter={16}>
                        <Col span={8}>
                            {this.renderFormItem('company', 'Company Name')}
                        </Col>
                        <Col span={8}>
                            {this.renderFormItem('industry', 'Industry')}
                        </Col>
                        <Col span={8}>
                            {this.renderDropdown('degree', 'Degree', [
                               'None',
                               'High School Diploma',
                               "Bachelor's",
                               "Masters",
                               "PhD"
                            ])}
                        </Col>
                    </Row>

                    {this.renderFormItem('description', 'Job Description', true)}

                    <Row gutter={16}>
                        <Col span={8}>
                            {this.renderFormItem('experienceLevel', 'Experience Level (years)')}
                        </Col>
                        <Col span={8}>
                            {this.renderFormItem('term', 'Term (length of work period)')}
                        </Col>
                        <Col span={8}>
                            {this.renderDropdown('employmentType', 'Employment Type', [
                               'Internship',
                               "Part Time",
                               "Full Time",
                               "Contract"
                            ])}
                        </Col>
                    </Row>

                    {this.renderSkills()}

                </Form>
            </Modal>
        )
    }
}

export default JobForm
