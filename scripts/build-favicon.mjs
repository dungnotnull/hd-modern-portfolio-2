import sharp from "sharp";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "media", "favicon");

mkdirSync(outDir, { recursive: true });

const svgPath = join(outDir, "favicon.svg");
const svgBuffer = readFileSync(svgPath);

const sizes = [
  { name: "favicon-96x96.png", size: 96 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "web-app-manifest-192x192.png", size: 192 },
  { name: "web-app-manifest-512x512.png", size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(svgBuffer).resize(size, size).png().toFile(join(outDir, name));
  console.log(`generated ${name} (${size}x${size})`);
}

// Build multi-size ICO (16, 32, 48) by packing PNGs in ICO container.
const icoSizes = [16, 32, 48];
const pngs = [];
for (const size of icoSizes) {
  pngs.push(await sharp(svgBuffer).resize(size, size).png().toBuffer());
}

const headerSize = 6 + icoSizes.length * 16;
const offsets = [];
let offset = headerSize;
for (let i = 0; i < pngs.length; i++) {
  offsets.push(offset);
  offset += pngs[i].length;
}

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);

for (let i = 0; i < icoSizes.length; i++) {
  const size = icoSizes[i];
  const entryOffset = 6 + i * 16;
  header.writeUInt8(size === 256 ? 0 : size, entryOffset);
  header.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
  header.writeUInt8(0, entryOffset + 2);
  header.writeUInt8(0, entryOffset + 3);
  header.writeUInt16LE(1, entryOffset + 4);
  header.writeUInt16LE(32, entryOffset + 6);
  header.writeUInt32LE(pngs[i].length, entryOffset + 8);
  header.writeUInt32LE(offsets[i], entryOffset + 12);
}

const ico = Buffer.concat([header, ...pngs]);
writeFileSync(join(outDir, "favicon.ico"), ico);
console.log("generated favicon.ico");

// Write manifest
const manifest = {
  name: "dungnotnull portfolio",
  short_name: "dungnotnull",
  icons: [
    { src: "/media/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/media/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }
  ],
  theme_color: "#9333ea",
  background_color: "#0a0a0a",
  display: "standalone",
  start_url: "/"
};
writeFileSync(join(outDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));
console.log("generated site.webmanifest");
