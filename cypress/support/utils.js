Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task('parseXlsx', {filePath: inputFile})
})

Cypress.Commands.add("convertXlsxToJson", (inputFile) => {
    cy.parseXlsx(inputFile).then((jsonData) => {
        const data = [];
        const rowLength = Cypress.$(jsonData[0].data).length
        jsonData = jsonData[0].data

        for(let index = 1; index < rowLength; index++){
            let colors = jsonData[index][2].split(',').map(function(item) {
                return item.trim();
            });
        
            let preferedContacts = jsonData[index][6].split(',').map(function(item) {
                return item.trim();
            });
            
            data[index-1] = {
                isNewCustomer:     jsonData[index][0],
                productNum:        jsonData[index][1],
                colorsNumbers:     colors,
                productSize:       jsonData[index][3],
                name:              jsonData[index][4],
                email:             jsonData[index][5],
                preferredContacts: preferedContacts,
                Questions:         jsonData[index][7],
                deliveryDate:      jsonData[index][8],
                deliveryTime:      jsonData[index][9],
            }
        }
        cy.writeFile("cypress/fixtures/xlsxData.json", data)
    })
  })