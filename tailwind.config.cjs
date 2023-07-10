/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        body: [
          "ヒラギノ丸ゴ Pro W4",
          "ヒラギノ丸ゴ Pro",
          "Hiragino Maru Gothic Pro",
          "ヒラギノ角ゴ Pro W3",
          "Hiragino Kaku Gothic Pro",
          "Meiryo",
          "メイリオ",
          "游ゴシック体",
          "YuGothic",
          "游ゴシック",
          "Yu Gothic",
          "sans-serif",
        ],
      },
      colors: {
        giray: "#555555",
      },
      fontSize: {
        xxs: ["0.5rem", "0.8rem"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
