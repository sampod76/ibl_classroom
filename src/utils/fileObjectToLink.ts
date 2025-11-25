/**
 * Note:
 * 1. If src is an object -->
 *     1. Look for cdn, if found merge with path to create url (fast fetching)
 *     2. If no cdn found, use the direct url
 *
 * 2. If src is string / anything other than object --> use the direct src
 *
 * 3. If no src found, use the default image
 *
 */

import { configEnv } from "@/helpers/config/envConfig";
export function buildS3Url(cdn: string, path: string) {
  const segments = path.split("/");
  const filename = segments.pop(); // remove last segment
  const encodedFilename = encodeURIComponent(filename || "");
  return (
    cdn.replace(/\/$/, "") + "/" + segments.join("/") + "/" + encodedFilename
  );
}

export default function fileObjectToLink(src?: {
  cdn?: string;
  path?: string;
  url?: string;
  server_url?: string;
}) {
  // Backend baseurl
  const backendBaseUrl = configEnv.API_BASE_URL;

  let imageSrc;
  if (src?.cdn && src.path) {
    // imageSrc = src.cdn + '/' + src.path;
    imageSrc = buildS3Url(src.cdn, src.path);
    // console.log('🚀 ~ imageSrc:', imageSrc);
  } else if (typeof src === "object" && src.url) {
    imageSrc = src.url;
  } else if (src?.server_url) {
    imageSrc = backendBaseUrl + "/" + src.server_url;
  } else if (typeof src === "string") {
    imageSrc = src;
  } else {
    imageSrc =
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1720180742~exp=1720184342~hmac=45367258d48f919941fdf6a910f0fbf3e86f0385c7ad53ec92ecc7b3e7e3c641&w=300";
  }

  return imageSrc;
}
