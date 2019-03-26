// external imports
import React from 'react'
import { mount } from 'enzyme'
// local imports
import FilePicker from '.'

describe('File Picker', () => {
  let onChange
  let onError

  beforeEach(() => {
    onChange = jest.fn()
    onError = jest.fn()
  })

  test('returns a valid component with required props', () => {
    const ele = (
      <FilePicker onChange={() => ({})} onError={() => ({})}>
        <button>Click to upload</button>
      </FilePicker>
    )

    expect(React.isValidElement(ele)).toBe(true)
  })

  test('call error handler when no file uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker onChange={onChange} onError={onError}>
        <div>Click here</div>
      </FilePicker>
    )

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [] } })

    expect(onError.mock.calls.length).toBe(1)
    expect(onChange.mock.calls.length).toBe(0)
  })

  test('call error handler when a file with incorrect extension is uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker onChange={onChange} onError={onError} extensions={['md']}>
        <div>Click here</div>
      </FilePicker>
    )

    const file = new Blob(['file contents'], { type: 'text/plain' })
    file.name = 'file.txt'

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } })

    expect(onError.mock.calls.length).toBe(1)
    expect(onChange.mock.calls.length).toBe(0)
  })

  test('call error handler when a file that is too large is uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        onChange={onChange}
        onError={onError}
        // set unreasonably small max size so that our tiny blob is too big
        maxSize={0.0000000001}
      >
        <div>Click here</div>
      </FilePicker>
    )

    const file = new Blob(['file contents'], { type: 'text/plain' })

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } })

    expect(onError.mock.calls.length).toBe(1)
    expect(onChange.mock.calls.length).toBe(0)
  })

  test('call change handler when a file with correct size and extension is uploaded', () => {
    // mount the select with a few options
    const wrapper = mount(
      <FilePicker
        onChange={onChange}
        onError={onError}
        extensions={['txt']}
        maxSize={1}
      >
        <div>Click here</div>
      </FilePicker>
    )

    const file = new Blob(['file contents'], { type: 'text/plain' })
    file.name = 'file.txt'

    // trigger the onChange callback on file input
    wrapper.find('input').simulate('change', { target: { files: [file] } })

    expect(onError.mock.calls.length).toBe(0)
    expect(onChange.mock.calls.length).toBe(1)
  })
})
