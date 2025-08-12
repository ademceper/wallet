const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');
const svg = require('@svgr/rollup');
const alias = require('@rollup/plugin-alias');
const path = require('path');

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: './dist',
    tsConfig: './tsconfig.lib.json',
    compiler: 'babel',
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    format: ['esm'],
    assets: [{ input: '.', output: '.', glob: 'README.md' }],
  },
  {
    plugins: [
      alias({
        entries: [
          { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
      }),
      svg({
        svgo: false,
        titleProp: true,
        ref: true,
      }),
      url({
        limit: 10000, // 10kB
      }),
    ],
  }
);
