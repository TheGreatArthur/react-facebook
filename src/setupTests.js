require('@testing-library/jest-dom')

// Polyfill TextEncoder/TextDecoder (nécessaire pour react-router dans Jest)
const { TextEncoder, TextDecoder } = require('util')

if (!global.TextEncoder) global.TextEncoder = TextEncoder
if (!global.TextDecoder) global.TextDecoder = TextDecoder