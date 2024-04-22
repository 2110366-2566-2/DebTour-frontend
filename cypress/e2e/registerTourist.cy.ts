describe('Register Tourist', () => {
    beforeEach(() => {
    })
    it('Register Tourist ', () => {
        cy.fixture('registerTourist.json').then((tourist) => {
            for(let i in tourist) {
                cy.visit('/auth/signup/tourist')

                if (tourist[i].email != "")
                    cy.get('input[name="phone"]').type(tourist[i].phone)
                cy.wait(500)

                if (tourist[i].citizenID != "")
                    cy.get('input[name="citizenId"]').type(tourist[i].citizenID)
                cy.wait(500)

                if (tourist[i].firstname != "")
                    cy.get('input[name="firstname"]').type(tourist[i].firstname)
                cy.wait(500)

                if (tourist[i].lastname != "")
                    cy.get('input[name="lastname"]').type(tourist[i].lastname)
                cy.wait(500)

                cy.get('button').contains('Next').click().click()
                cy.wait(500)


                cy.get('textarea[name="address"]').clear()
                if (tourist[i].address != "")
                    cy.get('textarea[name="address"]').type(tourist[i].address)
                cy.wait(500)

                if (tourist[i].expected == 'valid') {
                    cy.get("p[id^=':r'][id$=':-form-item-message']").should("not.exist");
                    cy.get('button').contains('Previous').click().click()
                    cy.wait(500)
                    cy.get("p[id^=':r'][id$=':-form-item-address']").should("not.exist");
                } else {
                    cy.get('body').then((body) => {
                        if (body.find("p[id^=':r'][id$=':-form-item-message']").length > 0) {
                            cy.get("p[id^=':r'][id$=':-form-item-message']").should("exist");
                        }
                    })
                    cy.wait(500)
                    cy.get('button').contains('Previous').click().click()
                    cy.get('body').then((body) => {
                        if (body.find("p[id^=':r'][id$=':-form-item-address']").length > 0) {
                            cy.get("must").should("exist");
                        }
                    })
                }
                cy.wait(3000)
            }
        })
    })
})