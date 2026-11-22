# byte-craft-demo

Live demo project that installs and uses the npm package
[`@vishalgowda/byte-craft`](https://www.npmjs.com/package/@vishalgowda/byte-craft) -
an ultra-lightweight, zero-dependency binary and byte buffer toolkit.

## What the demo shows

- `ByteWriter` - builds a structured binary packet (uint16 + UTF-8 string + float32)
- `formatHexDump` - renders the encoded bytes as a canonical hexdump
- `toHex` / `toBase64` - encodes the packet as hex and base64 strings
- `crc32` - computes the IEEE CRC32 checksum of the packet
- `ByteReader` - decodes the same buffer back and verifies the round-trip
- `FlagSet` - toggles named bit flags and shows the resulting mask

## Run it locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs static site to dist/
```

## Live demo

Deployed with GitHub Pages: https://pixelcraftlab.github.io/byte-craft-demo/
