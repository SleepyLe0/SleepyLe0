import { readFile, writeFile } from 'node:fs/promises';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { createIsland } from '../artwork-source/island-model.mjs';

const island = createIsland();
const exporter = new STLExporter();
const ascii = exporter.parse(island)
  .replace(/solid exported/g, 'solid sleepy_island')
  .replace(/-?\d+\.\d+(?:e[+-]?\d+)?/gi, value => String(Number(Number(value).toFixed(3))))
  .replace(/^\s+/gm, '');

const geometry = new STLLoader().parse(ascii);
const positions = geometry.getAttribute('position');
if (!positions.count || !Array.from(positions.array).every(Number.isFinite)) {
  throw new Error('The island must contain finite triangles.');
}
geometry.computeBoundingBox();
if (geometry.boundingBox.isEmpty()) throw new Error('The island bounds are empty.');

const template = await readFile(new URL('../artwork-source/README.template.md', import.meta.url), 'utf8');
if (template.split('<!-- ISLAND_STL -->').length !== 2) {
  throw new Error('Expected one inline model placeholder.');
}
const readme = template.replace('<!-- ISLAND_STL -->', '```stl\n' + ascii.trim() + '\n```');
if (Buffer.byteLength(readme) > 450_000) {
  throw new Error('Keep the README below 450 KB so GitHub can render all its content.');
}
await writeFile(new URL('../assets/sleepy-island.stl', import.meta.url), ascii);
await writeFile(new URL('../README.md', import.meta.url), readme);
console.log(`Island: ${positions.count / 3} triangles; README: ${Buffer.byteLength(readme)} bytes.`);
