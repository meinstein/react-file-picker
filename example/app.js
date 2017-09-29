// external imports
import React from 'react'
// internal imports
import { FilePicker, ImagePicker } from '../src'

const App = () => (
  <div>
    <FilePicker
      extensions={['md']}
      onChange={FileObject => console.log(FileObject)}
      onError={errMsg => console.log(errMsg)}
    >
      <button>Click to upload markdown</button>
    </FilePicker>
    <ImagePicker
      extensions={['jpg', 'jpeg', 'png']}
      dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
      onChange={base64EncodedString => console.log(base64EncodedString)}
      onError={errMsg => console.log(errMsg)}
    >
      <button>Click to upload image</button>
    </ImagePicker>
  </div>
)

export default App
