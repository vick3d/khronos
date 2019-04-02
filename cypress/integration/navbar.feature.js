describe('Display Navbar', () => {
	it('when user navigates the site', () => {
		cy.visit('http://localhost:3000')
		cy.get('div[name="logo"]').find("img")
			.should('be.visible');  
  }