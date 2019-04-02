
describe('Display landing page', () => {
	it('when user visits the page', () => {
		cy.visit('http://localhost:3000')
		cy.get('div[name="text"]')
			.should('contain', 'Are you a freelancer?')
		cy.get('button[name="button"]')
			.should('contain', 'Get started here!')
		cy.get('div[name="images"]').find("img")
			.should('be.visible');
	})
})