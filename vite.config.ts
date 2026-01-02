import { defineConfig, build } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

// Plugin to build content script separately and copy static files
function buildContentScript() {
    return {
        name: 'build-content-script',
        async closeBundle() {
            // Build content script separately with IIFE format
            await build({
                configFile: false,
                build: {
                    outDir: 'dist',
                    emptyOutDir: false,
                    lib: {
                        entry: resolve(__dirname, 'src/content/index.ts'),
                        name: 'RePRoContent',
                        formats: ['iife'],
                        fileName: () => 'content.js',
                    },
                    rollupOptions: {
                        output: {
                            extend: true,
                        },
                    },
                },
            });
            console.log('✓ Built content script');

            // Copy static files
            if (!existsSync('dist')) {
                mkdirSync('dist', { recursive: true });
            }

            // Copy content.css
            try {
                copyFileSync('src/content/content.css', 'dist/content.css');
                console.log('✓ Copied content.css');
            } catch (e) {
                console.error('Failed to copy content.css:', e);
            }

            // Copy manifest.json
            try {
                copyFileSync('manifest.json', 'dist/manifest.json');
                console.log('✓ Copied manifest.json');
            } catch (e) {
                console.error('Failed to copy manifest.json:', e);
            }

            // Copy icons directory
            if (!existsSync('dist/icons')) {
                mkdirSync('dist/icons', { recursive: true });
            }
            try {
                copyFileSync('public/icon.svg', 'dist/icons/icon.svg');
                console.log('✓ Copied icon.svg');
            } catch (e) {
                console.error('Failed to copy icon.svg:', e);
            }
        }
    };
}

export default defineConfig({
    plugins: [react(), buildContentScript()],
    base: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'src/popup/index.html'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
    },
});
