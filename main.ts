import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const here = dirname(process.argv[1]);
const imagePath = join(here, 'entry.png');
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || '/output';

async function publishImage(): Promise<void> {
  const bytes = await readFile(imagePath);
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const jpegSignature = Buffer.from([0xff, 0xd8, 0xff]);
  const isPng = bytes.subarray(0, pngSignature.length).equals(pngSignature);
  const isJpeg = bytes.subarray(0, jpegSignature.length).equals(jpegSignature);

  if (!isPng && !isJpeg) {
    throw new Error(`Image at ${imagePath} has neither a PNG signature nor a JPEG SOI marker.`);
  }

  await mkdir(outputDirectory, { recursive: true });
  const destination = join(outputDirectory, 'entry.png');
  await writeFile(destination, bytes);
  console.log(`Wrote entry.png (${bytes.length} bytes) to ${destination}`);
}

publishImage().catch((error: unknown) => {
  const detail = error instanceof Error ? error.message : String(error);
  console.error(`Unable to publish the competition image: ${detail}`);
  process.exitCode = 1;
});
