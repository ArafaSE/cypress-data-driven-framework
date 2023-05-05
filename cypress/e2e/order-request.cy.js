/// <reference types="cypress" />

const xlsxDataFilePath = 'cypress/fixtures/ordersData.excel.xlsx';
const ordersData = require("../fixtures/ordersData.json")
const ordersJsonDataFromXlsx = require("../fixtures/xlsxData.json")

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
    ordersData.forEach((order) => {
      it('User can request order using JSON file data', () => {
        cy.fillOrderData(order)
  
        cy.get("[role='heading']").should('have.text', 'Order Request')
        cy.get(".c2gzEf > a").should('be.be.visible')
      });
    })
   
    ordersJsonDataFromXlsx.forEach((order) => {
      it('User can request order using JSON file data', () => {
        cy.fillOrderData(order)
  
        cy.get("[role='heading']").should('have.text', 'Order Request')
        cy.get(".c2gzEf > a").should('be.be.visible')
      });
    })
   
});