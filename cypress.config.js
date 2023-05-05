const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries:
    {
      runMode: 1,
      openMode: 1,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://docs.google.com/forms/d/e/',
    screenshotOnRunFailure: true,
    video: true,
    videoUploadOnPasses: false,
  },
});
