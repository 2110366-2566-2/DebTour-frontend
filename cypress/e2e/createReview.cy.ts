require("../support/commands");

describe('Tour Page', () => {
    // before(() => {
    //   cy.log(`Visiting the Deb Tour page`)
    //   cy.visit('/', {
    //   })
    // })
    it('Create Review', () => {
        // Call your custom cypress command
        cy.login();

// // Visit a route in order to allow cypress to actually set the cookie
// cy.visit("/");
// // Wait until the intercepted request is ready
// // cy.wait("@session");
        // cy.visit('/tourist/tours')
        // cy.wait(4000)

        // cy.get("[href='/tourist/tours/17']").scrollIntoView();
        // cy.get("[href='/tourist/tours/17']").click();
        // cy.wait(4000)

        cy.visit('/tourist/tours/17');
        cy.wait(2000);
        cy.get("button").contains("Review").scrollIntoView({ duration: 2000 });

        cy.fixture("createReview.json").then((reviews) => {
            for(let review in reviews) {
                cy.get("button").contains("Review").click();
                cy.get("textarea[name='description']").clear();
                if(reviews[review].Description != "")
                    cy.get("textarea[name='description']").type(reviews[review].Description);
                cy.get("div[id^=':r'][id$=':-form-item'] > svg").eq(reviews[review].RatingScore-1).click({force: true});
                cy.get("button").contains("Submit").click();
                if(reviews[review].Validation == 'valid')
                    cy.get("div").contains("Review created").should("exist");
                else{
                    cy.get("p[id^=':r'][id$=':-form-item-message']").should("exist");
                    cy.get("div").contains("Review created").should("not.exist");
                    cy.get("div[role='dialog'] > button").click({force: true});
                }
                cy.wait(2000);
            }
        });

        // cy.get("[data-test-id='review']").click();
        // This is where you can now add assertions
// Example: provide a data-test-id on an element.
// This can be any selector that "always and only" exists when the user is logged in
// cy.get("[data-test-id='authenticated']").should("exist").then(() => {
// cy.log("Cypress login successful");
// });
    })
})