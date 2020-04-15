// external imports
import React from 'react'
import PropTypes from 'prop-types'
// local imports
import FileInput from '../FileInput'

class FilePicker extends React.Component {
  constructor(props) {
    super(props)

    this._validate = this._validate.bind(this)
  }

  _validate(files) {
    const { onError, onChange, maxSize, extensions, multiple } = this.props

    // make sure a file was provided in the first place
    if (!files) {
      onError('Failed to upload a file.')
      return
    }

     // convert maxSize from megabytes to bytes
     const maxBytes = maxSize * 1000000

    for (var i=0; i < files.length; i++) {
      const file = files[i]

      console.log(file)

        // if we care about file extensions
      if (extensions) {
        const uploadedFileExt = file.name
          .split('.')
          .pop()
          .toLowerCase()
        const isValidFileExt = extensions
          .map(ext => ext.toLowerCase())
          .includes(uploadedFileExt)

        if (!isValidFileExt) {
          onError(`Must upload a file of type: ${extensions.join(' or ')}`)
          return
        }
      }
      if (file.size > maxBytes) {
        onError(`File size must be less than ${maxSize} MB.`)
        return
      }
    }

    // return native file object or array
    return multiple ? onChange(files) : onChange(files[0])
  }

  render() {
    const { children, style, multiple } = this.props

    return (
      <FileInput onChange={this._validate} style={style} multiple={multiple}>
        {children}
      </FileInput>
    )
  }
}

FilePicker.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  // max file size in MB
  maxSize: PropTypes.number,
  // file extension
  extensions: PropTypes.array,
  // validate file contents
  validateContent: PropTypes.func,
  style: PropTypes.object,
  // Allow for multiple file selection
  multiple: PropTypes.multiple || false
}

FilePicker.defaultProps = {
  maxSize: 2
}

export default FilePicker
