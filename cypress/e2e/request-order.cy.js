/// <reference types="cypress" />

const ordersData = require("../fixtures/ordersData.json")
const ordersJsonDataFromXlsx = require("../fixtures/xlsxData.json")

const xlsxDataFilePath = 'cypress/fixtures/ordersData.excel.xlsx';
const form_url = "1FAIpQLSd-rn4cruZqa7fFsiyKnubKE7oMcNInR01KoY6W9A4kibH6QA/viewform?fbzx=1987628441857694275"

describe('Order Request Form', () => {
    before(() => {
      /** convert all data added in the excel file to json file before all tests */
      cy.convertXlsxToJson(xlsxDataFilePath);
    })
    beforeEach( ()=> {
      cy.visit(form_url)
    })
    /** Run test for each order added in the JSON file */
    ordersData.forEach((order, index) => {
      it('TC1-order-' + index + ' User can request order using JSON file data', () => {
        cy.fillOrderData(order)
        cy.verifyOrderCreation()
      });
    })
   /** Run test for each order added in the converted JSON file */
    ordersJsonDataFromXlsx.forEach((order, index) => {
      it('TC2-order-' + index + ' User can request order using converted JSON file from xlsx data', () => {
        cy.fillOrderData(order)
        cy.verifyOrderCreation()
      });
    })
   
});