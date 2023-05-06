const { defineConfig } = require("cypress");
const xlsx = require('node-xlsx');
const fs = require('fs');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://docs.google.com/forms/d/e/',
    screenshotOnRunFailure: true,
    video: true,
    videoUploadOnPasses: false,
    retries:
    {
      runMode: 1,
      openMode: 1,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { 
        parseXlsx({filePath}){
            return new Promise((resolve, reject) => {
                try{
                    const jsonData = xlsx.parse(fs.readFileSync(filePath));
                    resolve(jsonData);
                } catch (e){
                    reject(e);
                }
            })
        },
      });
      allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureReuseAfterSpec: false
    }
  },
});
