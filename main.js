import "./style.css";
import {
  ByteWriter,
  ByteReader,
  toHex,
  toBase64,
  formatHexDump,
  crc32,
  FlagSet,
} from "@vishalgowda/byte-craft";

const $ = (id) => document.getElementById(id);

function run() {
  const msg = $("msg").value || "ByteCraft";
  const pid = Math.max(0, Math.min(65535, Number($("pid").value) || 0));

  // 1. Encode structured binary data with ByteWriter
  const writer = new ByteWriter();
  writer.writeUint16(pid, "big").writeUtf8(msg).writeFloat32(3.14, "little");
  const buffer = writer.toUint8Array();

  // 2. Show the encoded bytes using package utilities
  $("hexdump").textContent = formatHexDump(buffer);
  $("hex").textContent = toHex(buffer);
  $("b64").textContent = toBase64(buffer);
  $("crc").textContent = "0x" + crc32(buffer).toString(16).padStart(8, "0");

  // 3. Decode the same buffer back with ByteReader
  const reader = new ByteReader(buffer);
  const readPid = reader.readUint16("big");
  const readMsg = reader.readUtf8(msg.length);
  const readFloat = reader.readFloat32("little");
  $("decoded").textContent =
    `packet id : ${readPid}\n` +
    `message   : "${readMsg}"\n` +
    `float     : ${readFloat.toFixed(2)}\n` +
    `round-trip: ${readPid === pid && readMsg === msg ? "OK - decoded values match the input" : "MISMATCH"}`;

  // 4. FlagSet permission demo
  const flags = new FlagSet(["read", "write", "execute", "share"]);
  flags.enable("read").enable("write").disable("execute");
  $("flags").textContent =
    `active flags  : ${flags.getActiveFlags().join(", ") || "(none)"}\n` +
    `isEnabled("read")  : ${flags.isEnabled("read")}\n` +
    `isEnabled("share") : ${flags.isEnabled("share")}\n` +
    `mask value    : 0b${flags.getMask().toString(2).padStart(4, "0")}`;
}

$("run").addEventListener("click", run);
run();
