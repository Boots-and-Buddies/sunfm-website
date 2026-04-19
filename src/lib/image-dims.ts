import fs from "fs";
import path from "path";
import sharp from "sharp";

const FALLBACK = { width: 1200, height: 800 };

export async function getPublicImageDims(
  src: string
): Promise<{ width: number; height: number }> {
  if (!src.startsWith("/")) return FALLBACK;
  const filePath = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(filePath)) return FALLBACK;
  const meta = await sharp(filePath).metadata();
  if (!meta.width || !meta.height) return FALLBACK;
  return { width: meta.width, height: meta.height };
}
