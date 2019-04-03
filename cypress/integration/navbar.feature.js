describe('Display Navbar', () => {
	it('when user navigates the site', () => {
		cy.visit('http://localhost:3000')
		cy.get('#logo').should('be.visible');
		cy.get('.user').should('be.visible');
		cy.get('.sign-in').should('be.visible');
		cy.get('.sign-out').should('be.visible');
		cy.get('.play').should('be.visible');
		cy.get('.stop').should('be.visible');
		cy.get('.help').should('be.visible');
		cy.get('.calendar').should('be.visible');
	})
})