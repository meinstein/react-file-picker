⚠️ ATTENTION ⚠️

This project is no longer being maintained, as the file picker has been migrated to [`react-sage/useFilePicker`](https://github.com/meinstein/react-sage)

# react-file-picker

[![Build Status](https://travis-ci.org/meinstein/react-file-picker.svg?branch=master)](https://travis-ci.org/meinstein/react-file-picker)
[![Coverage Status](https://coveralls.io/repos/github/meinstein/react-file-picker/badge.svg?branch=master)](https://coveralls.io/github/meinstein/react-file-picker?branch=master)
[![npm](https://img.shields.io/npm/v/react-file-picker.svg)](https://www.npmjs.com/package/react-file-picker)

Sensible file input wrappers. Demo included.

`npm i react-file-picker`

## Examples

```js
import { FilePicker } from 'react-file-picker'

const MyComponent = () => (
  <FilePicker
    extensions={['md']}
    onChange={FileObject => (/* do something with File object */)}
    onError={errMsg => (/* do something with err msg string */)
    maxSize={5000} /* (optional) defaults to 2000 in kilobytes */
  >
    <button>
      Click to upload markdown
    </button>
  </FilePicker>
)
```

```js
import { ImagePicker } from 'react-file-picker'

const MyComponent = () => (
  <ImagePicker
    extensions={['jpg', 'jpeg', 'png']}
    dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
    onChange={base64 => (/* do something with base64 encoded string */)
    onError={errMsg => (/* do something with err msg string */)
    maxSize={5000} /* (optional) defaults to 2000 in kilobytes */
  >
    <button>
      Click to upload image
    </button>
  </ImagePicker>
)
```

## Demo

```
npm run demo
```
