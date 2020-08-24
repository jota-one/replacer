const { build } = require('esbuild')

build({
  entryPoints: ['./index.js'],
  outfile: './cjs.js',
  bundle: true,
  format: 'cjs'
}).catch(() => process.exit(1))
