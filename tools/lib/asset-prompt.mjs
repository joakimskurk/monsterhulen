// How one image order is put together for an AI image provider (content/art-style.json + content/assets.json).
// Pure, so the validator, the order tool and tests compose prompts the same way.

export const kindOf = (asset) => asset.key.split(':')[0];

// The sidecar file that records how an image was made: same path as the image, with .json.
export const sidecarPath = (asset) => asset.file.replace(/\.[a-z]+$/, '.json');

export function composeOrder(style, asset) {
  const framing = style.framing[kindOf(asset)] || '';
  return {
    key: asset.key,
    file: asset.file,
    styleVersion: style.version,
    prompt: `${style.style.prompt} ${framing} Subject: ${asset.describe}`.replace(/\s+/g, ' ').trim(),
    negative: style.style.avoid,
    ...style.output,
  };
}
