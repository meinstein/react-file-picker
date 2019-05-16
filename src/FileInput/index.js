// external imports
import React from 'react'
import PropTypes from 'prop-types'

class FileInput extends React.Component {
  constructor(props) {
    super(props)

    this._handleUpload = this._handleUpload.bind(this)
  }

  _handleUpload(evt) {
    this.props.onChange(evt.target.files)

    // free up the fileInput again
    this.fileInput.value = null
  }

  render() {
    return (
      <div style={this.props.style}>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={this._handleUpload}
          ref={ele => (this.fileInput = ele)}
          multiple={this.props.multiple}
        />}
        {React.cloneElement(this.props.children, {
          onClick: () => this.fileInput.click()
        })}
      </div>
    )
  }
}

FileInput.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.multiple
}

export default FileInput
