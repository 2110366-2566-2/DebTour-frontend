require('../support/commands')

describe('Report Issue', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.login()
        cy.visit('/report-issue')
    })

    it('Report Issue Test', () => {
        cy.fixture('reportIssue.json').then((issue) => {
            for(let i in issue) {
                cy.get('button').contains('Report an Issue').click()
                cy.get('textarea[name="message"]').clear()
                if (issue[i].Message) {
                    cy.get('textarea[name="message"]').type(issue[i].Message)
                }
                cy.wait(2000)
                cy.get('input[type="file"]').selectFile(issue[i].Image)
                cy.wait(2000)
                cy.get('#radix-\\:R16uula\\: > form > div.flex.flex-col-reverse.sm\\:flex-row.sm\\:justify-end.sm\\:space-x-2 > button').scrollIntoView()
                cy.wait(2000)
                if (issue[i].Validation == 'valid') {
                    cy.get('#radix-\\:R16uula\\: > form > div.flex.flex-col-reverse.sm\\:flex-row.sm\\:justify-end.sm\\:space-x-2 > button').click({force: true})
                    cy.wait(2000)
                    cy.get('div').contains('Issue reported').should('exist')
                } else {
                    cy.get("p[id^=':r'][id$=':-form-item-message']").should("exist");
                    cy.get('#radix-\\:R16uula\\: > button').click({force: true})
                }
                cy.wait(5000)
            }
        })
    })
})