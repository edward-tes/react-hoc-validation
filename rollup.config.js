import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  input: 'src/index.js',
  
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: 'src'
      }
    }),
  ]
}

const devConfig = {
  output: {
    file: 'examples/dist/index.js',
    format: 'es'
  },
}

const prodConfig = {
  output: {
    file: 'dist/es/index.js',
    format: 'es'
  }, 
}

const config =  Object.assign({}, baseConfig, isProd ? prodConfig : devConfig ) 
export default config

