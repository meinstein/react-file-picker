// external imports
import React from 'react'
import PropTypes from 'prop-types'
// local imports
import { loadFile, loadImage } from '../utils'
import { FilePicker } from '..'

/**
* ImageInput returns a base64-encoded string of the
* given image. It does NOT return a native file object
* like the generic FilePicker component, but rather wraps it
* and then loads the image into HTMLImageElement in order
* to validate the dimensions of the uploaded image.
*/

class UploadImage extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    dims: PropTypes.shape({
      minWidth: PropTypes.number.isRequired,
      maxWidth: PropTypes.number.isRequired,
      minHeight: PropTypes.number.isRequired,
      maxHeight: PropTypes.number.isRequired
    }).isRequired
  }

  _handleImg = async file => {
    // grab used props
    const { onChange, onError, dims } = this.props

    try {
      const dataUrl = await loadFile(file)
      const img = await loadImage(dataUrl, dims)

      // pass base64-encoded string to onChnage handler
      onChange(img)
    } catch (err) {
      // pass err message to onError handler
      onError(err.message)
    }
  }

  render() {
    const {children, ...unused} = this.props
    // pass our own onChange handler here and
    // use the user-provided onChange handler above in _handleImg
    Reflect.deleteProperty(unused, 'onChange')

    return (
      <FilePicker onChange={this._handleImg} {...unused}>
        {children}
      </FilePicker>
    )
  }
}

export default UploadImage
