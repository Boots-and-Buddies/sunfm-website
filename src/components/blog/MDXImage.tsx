import Image from "next/image";
import { getPublicImageDims } from "@/lib/image-dims";

interface Props {
  src?: string;
  alt?: string;
}

export default async function MDXImage({ src, alt }: Props) {
  if (!src) return null;

  if (!src.startsWith("/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        decoding="async"
        className="rounded-xl"
      />
    );
  }

  const { width, height } = await getPublicImageDims(src);

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      sizes="(max-width: 680px) 100vw, 680px"
      className="rounded-xl w-full h-auto"
    />
  );
}
