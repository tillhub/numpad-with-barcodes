const specials = ['Alt', 'Shift', 'Meta', 'MetaShift', 'Control', 'Dead']

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str
  return str.substr(0, index) + chr + str.substr(index + 1)
}

export default function makeBarcodeReader() {
  let timeoutHandler = null
  let input = ''

  return Object.freeze({
    handleBarcode
  })

  function handleBarcode(event, cb) {
    if (!event) return
    clearTimeout(timeoutHandler)

    if (event.key === 'Enter') {
      clearTimeout(timeoutHandler)

      // handle a nasty common windows line feed
      if (input && input.length && input[input.length - 1] === 'j') {
        input = setCharAt(input, input.length - 1, '')
      }

      if (input && input.length && (input[0] === '{' || input[0] === '[')) {
        try {
          input = JSON.parse(input)
        } catch (err) {
          console.error('barcodes: tried to parse structured data but failed') // eslint-disable-line
        }
      }

      console.info('barcodes: will return input:', input) // eslint-disable-line
      cb(input)
      input = ''
      return
    }

    if (isQRObject(event.key) && !specials.includes(event.key)) {
      input += event.key
      return
    }

    timeoutHandler = setTimeout(() => {
      clearTimeout(timeoutHandler)

      if (input.length <= 3) {
        input = ''
        return
      }

      console.info('barcodes: will clear input') // eslint-disable-line

      input = ''
    }, 120)
  }
}

function isQRObject(key) {
  if (/[a-zA-Z0-9-:},/{}"\s]/.test(key)) {
    return true
  }
  return false
}
