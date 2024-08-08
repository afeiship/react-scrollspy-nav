import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  cjsInterop: true,

  // react
  minify: true,
  sourcemap: true,
  splitting: true,
  target: 'es6',
  bundle: true,
  external: ['react', 'react-dom', '@jswork/scrolled-event', '@jswork/harmony-events', 'classnames'],
  loader: {
    '.svg': 'dataurl',
  },
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});
