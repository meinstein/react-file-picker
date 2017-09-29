# react-file-picker

A simple wrapper around the native file input

`npm i react-file-picker`

## Examples

```js
import { PickFile } from 'react-file-picker'

const MyComponent = () => (
  <PickFile
    extensions={['md']}
    onChange={FileObject => (/* do something with File object */)}
    onError={errMsg => (/* do something with err msg string */)
  >
    <button>
      Click to upload markdown
    </button>
  </PickFile>
)
```

```js
import { PickImage } from 'react-file-picker'

const MyComponent = () => (
  <PickImage
    extensions={['jpg', 'jpeg', 'png']}
    dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
    onChange={base64 => (/* do something with base64 encoded string */)
    onError={errMsg => (/* do something with err msg string */)
  >
    <button>
      Click to upload image
    </button>
  </PickImage>
)
```
