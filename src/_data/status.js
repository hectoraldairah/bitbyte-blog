import EleventyFetch from "@11ty/eleventy-fetch";

export default async function() {
  const url = "https://status.cafe/users/_bitbyte_/status.json";
  const data = await EleventyFetch(url, { duration: "1d", type: "json" });

  return JSON.parse(data);
};
