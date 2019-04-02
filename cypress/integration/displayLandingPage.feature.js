
describe('Display landing page', () => {
	it('when user visits the page', () => {
		cy.visit('http://localhost:3000')
		cy.get('section[name="logo"]').find("img")
			.should('be.visible');
		cy.get('section[name="text"]')
			.should('contain', 'Are you a freelancer?')
		cy.get('button[name="button"]')
			.should('contain', 'Get started here!')
		cy.get('section[name="image"]').find("img")
			.should('be.visible');
		cy.get('section[name="text"]')
			.should('contain', 'Khronos is a web time-tracking application that..')
	})
})