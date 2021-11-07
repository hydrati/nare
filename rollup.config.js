import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'
import cjs from '@rollup/plugin-commonjs'
import node from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import ts from '@rollup/plugin-typescript'
import wasm from '@rollup/plugin-wasm'
import alias from '@rollup/plugin-alias'

export default defineConfig([{
    input: "./src/index.ts",
    plugins: [
        wasm({
            sync: ["@narejs/jieba/nare_jieba_bg.wasm"]
        }),
        ts({
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: "./types/",
            sourceMap: true
        }),
        alias({
            entries: [
                { find: '@narejs/jieba', replacement: '@narejs/jieba/node-esm' }
            ]
        }),
        node({
            browser: false
        }),
        json(),

        terser()
    ],
    external: ["@node-rs/jieba"],
    output: {
        format: "cjs",
        sourcemap: true,
        file: "./dist/index.js"
    }
}, {
    input: "./src/index.ts",
    plugins: [
        wasm({
            sync: ["@narejs/jieba/nare_jieba_bg.wasm"]
        }),
        ts({
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: "./types/",
            sourceMap: true
        }),
        node({
            browser: true
        }),
        json(),
        cjs(),
        terser()
    ],
    external: ["@node-rs/jieba"],
    output: {
        format: "esm",
        file: "./dist/index.esm.js",
        sourcemap: true
    }
}])