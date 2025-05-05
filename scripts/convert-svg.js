const { execSync } = require('child_process')
const path = require('path')

const svgPath = path.join(__dirname, '../public/favicon.svg')
const output192 = path.join(__dirname, '../public/icon-192.png')
const output512 = path.join(__dirname, '../public/icon-512.png')

try {
  // Convert to 192x192
  execSync(`npx svgexport ${svgPath} ${output192} 192:192`)
  console.log('Generated icon-192.png')

  // Convert to 512x512
  execSync(`npx svgexport ${svgPath} ${output512} 512:512`)
  console.log('Generated icon-512.png')
} catch (error) {
  console.error('Error converting SVG:', error.message)
  process.exit(1)
}
