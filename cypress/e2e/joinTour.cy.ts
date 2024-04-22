require("../support/commands");

describe('Tour Page', () => {
    // before(() => {
    //   cy.log(`Visiting the Deb Tour page`)
    //   cy.visit('/', {
    //   })
    // })
    it('Join Tour', () => {
        // Call your custom cypress command
        cy.login();

        cy.visit('/tourist/tours/17');
        cy.wait(2000);
        cy.get("button").contains("Join Tour").click();
        cy.wait(2000);
        cy.fixture("joinTour.json").then((members) => {
            for(let member in members) {

                cy.get("input[placeholder='First Name']").clear();
                if(members[member].firstname != "")
                    cy.get("input[placeholder='First Name']").type(members[member].firstname);

                cy.get("input[placeholder='Last Name']").clear();
                if(members[member].lastname != "")
                    cy.get("input[placeholder='Last Name']").type(members[member].lastname);

                cy.get("input[placeholder='Age").clear();
                if(members[member].age != "")
                    cy.get("input[placeholder='Age").type(members[member].age);
                
                if(member == 0) cy.wait(4000);
                cy.wait(1000);
                if(members[member].expected == 'valid'){
                  cy.get("button").contains("Proceed to Payment").should('not.be.disabled');
                }
                else
                  cy.get("button").contains("Proceed to Payment").should('be.disabled');

                cy.wait(1000);
            }
        });
    })
})