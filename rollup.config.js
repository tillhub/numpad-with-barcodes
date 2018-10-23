import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true
    }
  ],
  external: ['styled-components'],
  plugins: [
    external(),
    url(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      plugins: ['external-helpers', 'transform-runtime']
    }),
    resolve(),
    commonjs()
  ]
}
