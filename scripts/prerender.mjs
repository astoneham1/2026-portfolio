// Runs after `vite build` and the SSR build: bakes the rendered React app into dist/index.html
// (so crawlers and link previews see real content) and stamps the sitemap's <lastmod>.
import { execSync } from 'node:child_process';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const indexPath = path.join(dist, 'index.html');
const template = await readFile(indexPath, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error(`Could not find ${placeholder} in dist/index.html`);
await writeFile(indexPath, template.replace(placeholder, `<div id="root">${render()}</div>`));

// lastmod = date of the latest commit (the last time content changed), falling back to today
let lastmod;
try {
  lastmod = execSync('git log -1 --format=%cs', { cwd: root, encoding: 'utf8' }).trim();
} catch {
  lastmod = new Date().toISOString().slice(0, 10);
}
const sitemapPath = path.join(dist, 'sitemap.xml');
const sitemap = await readFile(sitemapPath, 'utf8');
await writeFile(sitemapPath, sitemap.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`));

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered dist/index.html, sitemap lastmod ${lastmod}`);
