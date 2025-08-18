import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const url = "https://status.cafe/users/_bitbyte_/status.json";
  try {
    const data = await EleventyFetch(url, {
      duration: "30m",
      type: "json",
    });

    if (data && typeof data === "object" && "author" in data) return data;

    if (typeof data === "string") return JSON.parse(data);

    return {};
  } catch (err) {
    console.error("status data error:", err);
    return err;
  }
}
