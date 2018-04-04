import React,{ Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import { Tag } from 'antd';


export default class extends Component{
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: false,
    onChange: noop,
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    this.state = {
      value: inProps.value
    };
  }

  componentWillReceiveProps( inProps ){
    const { value } = inProps;
    if( value !== this.state.value ){
      this.setState({ value });
    }
  }

  _onChange = inEvent => {
    const target = { value: inEvent };
    const { onChange } = this.props;
    this.setState(target, ()=>{
      onChange({ target });
    });
  };

  render(){
    const { className, ...props } = this.props;
    const { value } = this.state;

    console.log(value);
    return (
      <Tag.CheckableTag {...props} checked={value} onChange={this._onChange} className={classNames('react-ant-checkable-tag',className)} />
    );
  }
}
