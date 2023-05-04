/// <reference types="cypress" />

describe('Order Request Form', () => {
    beforeEach(() => {
      cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSd-rn4cruZqa7fFsiyKnubKE7oMcNInR01KoY6W9A4kibH6QA/viewform?fbzx=1987628441857694275')
    })
  
    it('User can request order from google form', () => {
      
      cy.fillRequestForm(true, 223, [3, 4], 4, "Mohamed", "mohamed.arafa.swt@gmail.com", ["email", "Phone"], "Do you have a return policy?", "2023-05-30", "02:30" )

      cy.get("[role='heading']").should('have.text', 'Order Request')
      cy.get(".c2gzEf > a").should('be.be.visible')
    });
});

Cypress.Commands.add('fillRequestForm', (isNewCustomer, productNum, colorsNumbers , productSize, name, email, preferredContacts, Questions, deliveryDate, deliveryTime ) => {

  isNewCustomer ? cy.contains('I am a new customer').click({force:true}) : 
                  cy.contains('I am an existing customer').click({force:true})

  cy.get('[aria-labelledby="i11"]')
    .type(productNum)
    .should('have.value', productNum)

  for (const color of colorsNumbers) {
    cy.contains('color ' + color).click({force:true});
  }

  cy.get("div[role='option'][data-value='']").click({force: true})
  cy.get("div[role='option'][data-value='" + productSize + "']").as('productSizeOption').click({force: true})
  cy.get('@productSizeOption').click({force: true})
  cy.get('@productSizeOption').should('attr', 'aria-selected', "true");

  cy.get('[aria-labelledby="i36"]')
    .type(name)
    .should('have.value', name)

  cy.get('[aria-labelledby="i40"]')
    .type(email)
    .should('have.value', email)

  for (let contact of preferredContacts) {
    contact = contact[0].toUpperCase() + contact.slice(1);
    cy.contains(contact).click({force: true})
  }

  cy.get('[aria-labelledby="i55"]').type(Questions)

  cy.get("input[type='date']")
    .type(deliveryDate)
    .should('have.value', deliveryDate)

  const timeHour =  deliveryTime.split(":")[0]
  const timeMinutes =  deliveryTime.split(":")[1]
  cy.get("[role='combobox']")
    .first()
    .type(timeHour)
    .should('have.value', timeHour)

  cy.get("[role='combobox']")
    .last()
    .type(timeMinutes)
    .should('have.value', timeMinutes)

  cy.get("[role='button']").eq(2).click()

});