/// <reference types="cypress" />

describe('Order Request Form', () => {
    beforeEach(() => {
      cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSd-rn4cruZqa7fFsiyKnubKE7oMcNInR01KoY6W9A4kibH6QA/viewform?fbzx=1987628441857694275')
    })
  
    it('User can request order from google form', () => {
      cy.get('[aria-labelledby="i11"]').type('Headphone').should('have.value', 'Headphone')
    
      cy.contains('I am a new customer').click({force:true});
      cy.contains('color 1').click({force:true});

      cy.get("[data-value='']").click({force:true});
      cy.get("[data-value='4']").click({force:true});
      
      cy.get("[data-value='4']").as('product')
      cy.get('@product').click({force:true, multiple: true})
      cy.get('@product').should('attr', 'aria-selected', "true");

      cy.get('[aria-labelledby="i36"]').as('inputName')
      cy.get('@inputName').type('Mohamed').should('have.value', 'Mohamed')
      cy.get('[aria-labelledby="i40"]').type('mohamed.arafa.swt@gmail.com').should('have.value', 'mohamed.arafa.swt@gmail.com')

     

      cy.contains('Phone').click({force: true})
      cy.contains('Email').click({force: true})

      cy.get('[aria-labelledby="i55"]').type('Do you have a return policy?')

      cy.get("input[type='date']").as('inputDate')
      cy.get('@inputDate').type("2023-05-30").should('have.value', '2023-05-30')

      cy.get("[role='combobox']").first().type('04').should('have.value', '04')
      cy.get("[role='combobox']").last().type('30').should('have.value', '30')

      cy.get("[role='button']").eq(2).click()   
    })

});