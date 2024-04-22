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

                cy.get("button").contains("Proceed to Payment").click();
                if(members[member].expected == 'valid'){
                    cy.url().should('include', 'https://checkout.stripe.com');
                    cy.go('back');
                }
                else
                    cy.url().should('not.include', 'https://checkout.stripe.com');

                cy.wait(2000);
            }
        });
    })
})