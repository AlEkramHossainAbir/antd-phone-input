import { defineConfig } from 'tsup';
import fs from 'fs';

// Simple CSS Modules plugin for esbuild
const cssModulesPlugin = {
  name: 'css-modules',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(build: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    build.onLoad({ filter: /\.module\.css$/ }, async (args: any) => {
      const css = await fs.promises.readFile(args.path, 'utf8');
      
      // Extract class names from CSS
      const classNames = css.match(/\.[\w-]+/g) || [];
      const classNamesObject: Record<string, string> = {};
      
      classNames.forEach((className) => {
        const name = className.slice(1); // Remove leading dot
        classNamesObject[name] = name;
      });
      
      // Return JS module that exports class names
      const jsContent = `
        const styles = ${JSON.stringify(classNamesObject)};
        export default styles;
      `;
      
      return {
        contents: jsContent,
        loader: 'js',
      };
    });
  },
};

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'antd', '@ant-design/icons'],
  treeshake: true,
  minify: false,
  outDir: 'dist',
  // Keep 'use client' directive for Next.js App Router compatibility
  banner: {
    js: "'use client';",
  },
  esbuildPlugins: [cssModulesPlugin],
});
