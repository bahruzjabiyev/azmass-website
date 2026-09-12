module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  eleventyConfig.addFilter("readableDate", (iso) => {
    if (!iso) return null;
    const [y, m, d] = iso.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  });

  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByTag("event").sort((a, b) =>
      (a.data.date || "9999-99-99").localeCompare(b.data.date || "9999-99-99")));

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
  };
};
