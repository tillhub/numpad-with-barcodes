function removeLastCharacter (str) {
  if (!str) return str
  return str.trim().slice(0, -1)
}

function removeLeadingZero (string) {
  if (!string) return ''
  return string.replace(/^0(?=[0-9-])/g, '')
}

module.exports = {
  removeLastCharacter,
  removeLeadingZero
}
