const { defineConfig } = require("cypress");
const xlsx = require('node-xlsx');

module.exports = defineConfig({
  e2e: {
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
                    const jsonData = xlsx.parse(filePath)[0].data;
                    resolve(jsonData);
                } catch (e){
                    reject(e);
                }
            })
        }
      });
    },
    baseUrl: 'https://docs.google.com/forms/d/e/',
    screenshotOnRunFailure: true,
    video: true,
    videoUploadOnPasses: false,
  },
});
