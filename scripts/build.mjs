import { cpSync, copyFileSync, mkdirSync } from 'node:fs';
import { build } from 'vite';

copyFileSync('index.source.html', 'index.html');
await build();
copyFileSync('dist/index.html', 'index.html');
mkdirSync('assets', { recursive: true });
cpSync('dist/assets', 'assets', { recursive: true });
