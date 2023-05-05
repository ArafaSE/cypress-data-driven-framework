/// <reference types="cypress" />

const form_url = "1FAIpQLSd-rn4cruZqa7fFsiyKnubKE7oMcNInR01KoY6W9A4kibH6QA/viewform?fbzx=1987628441857694275"
const ordersData = require("../fixtures/ordersData.json")

describe('Order Request Form', () => {
    beforeEach( ()=> {
      cy.visit(form_url)
    })

    ordersData.forEach((order) => {
      it('User can request order from google form', () => {
        cy.fillRequestForm(order)
  
        cy.get("[role='heading']").should('have.text', 'Order Request')
        cy.get(".c2gzEf > a").should('be.be.visible')
      });
    })
});