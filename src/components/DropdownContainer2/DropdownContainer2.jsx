import React, { Component } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import isEqual from 'lodash/isEqual'
import data from '../sizeData.json'

import '../DropdownContainer/styles.css'
export default class DropdownContainer2 extends Component {
  constructor(props){
    super(props)
    //this.state = { data: props.data }
  }

  componentWillReceiveProps = (nextProps) => {
    if(!isEqual(nextProps.data, data)) {
      this.setState({ data: nextProps.data })
    }
  }

  shouldComponentUpdate = (nextProps) => {
    return !isEqual(nextProps.data, data)
  }

  render() {
    const { ...rest } = this.props
    return (
      <DropdownTreeSelect data={data} {...rest} className="mdl-demo" />
    )
  }
}
