import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getRouteSeo, render, routes } from '../dist-ssr/entry-server.js';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const distributionDirectory = path.join(projectRoot, 'dist');
const template = await readFile(path.join(distributionDirectory, 'index.html'), 'utf8');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function replaceMeta(html, attribute, key, content) {
  const expression = new RegExp(
    `(<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*content=["'])[^"']*(["'][^>]*>)`,
    'i'
  );
  return html.replace(expression, `$1${escapeHtml(content)}$2`);
}

function applySeo(html, seo) {
  let output = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(seo.title)}</title>`
  );

  output = replaceMeta(output, 'name', 'description', seo.description);
  output = replaceMeta(output, 'property', 'og:url', seo.canonical);
  output = replaceMeta(output, 'property', 'og:title', seo.title);
  output = replaceMeta(output, 'property', 'og:description', seo.description);
  output = replaceMeta(output, 'name', 'twitter:title', seo.title);
  output = replaceMeta(output, 'name', 'twitter:description', seo.description);
  output = output.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/>/i,
    `<link rel="canonical" href="${seo.canonical}" />`
  );
  output = output.replace(
    /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(seo.structuredData)}</script>`
  );

  return output;
}

for (const route of routes) {
  const seo = getRouteSeo(route);
  const markup = render(route);
  const renderedPage = applySeo(template, seo).replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`
  );
  const routeDirectory =
    route === '/'
      ? distributionDirectory
      : path.join(distributionDirectory, route.replace(/^\//, '').replace(/\/$/, ''));

  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, 'index.html'), renderedPage, 'utf8');
}

console.log(`Prerendered ${routes.length} routes.`);
