const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      BACKEND: 'http://localhost:3003/api'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
