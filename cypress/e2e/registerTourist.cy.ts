describe('test register tourist', () => {
    it('valid input ', () => {
        cy.visit('https://deb-tour.vercel.app/auth/signup/tourist')
        cy.get('input[name="phone"]').type("0901234567")
        cy.get('input[name="citizenId"]').type("1234567890123")
        cy.get('input[name="firstname"]').type('Tawatwee')
        cy.get('input[name="lastname"]').type('Aiemareerat')
    })
})