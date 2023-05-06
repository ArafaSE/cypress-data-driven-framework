Cypress.Commands.add('fillOrderData', (orderData ) => {
  orderData = JSON.stringify(orderData);
  orderData = JSON.parse(orderData)
  
  orderData.isNewCustomer ? cy.contains('I am a new customer').click({force:true}) : 
                  cy.contains('I am an existing customer').click({force:true})

  cy.get('[aria-labelledby="i11"]')
    .type(orderData.productNum)
    .should('have.value', orderData.productNum)

  for (const color of orderData.colorsNumbers) {
    cy.contains('color ' + color).click({force:true});
  }

  cy.get("div[role='option'][data-value='']").click({force: true})
  cy.get("div[role='option'][data-value='" + orderData.productSize + "']").as('productSizeOption').click({force: true})
  cy.get('@productSizeOption').click({force: true})
  cy.get('@productSizeOption').should('attr', 'aria-selected', "true");

  cy.get('[aria-labelledby="i36"]')
    .type(orderData.name)
    .should('have.value', orderData.name)

  cy.get('[aria-labelledby="i40"]')
    .type(orderData.email)
    .should('have.value', orderData.email)

  for (let contact of orderData.preferredContacts) {
    contact = contact[0].toUpperCase() + contact.slice(1);
    cy.contains(contact).click({force: true})
  }

  cy.get('[aria-labelledby="i55"]').type(orderData.Questions)

  cy.get("input[type='date']")
    .type(orderData.deliveryDate)
    .should('have.value', orderData.deliveryDate)

  const timeHour =  orderData.deliveryTime.split(":")[0]
  const timeMinutes =  orderData.deliveryTime.split(":")[1]
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

Cypress.Commands.add("verifyOrderCreation", () => {
  cy.get("[role='heading']").should('have.text', 'Order Request')
  cy.get(".c2gzEf > a").should('be.be.visible')
})