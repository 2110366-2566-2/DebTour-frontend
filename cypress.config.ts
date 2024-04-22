import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      baseUrl: "https://deb-tour.vercel.app",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
