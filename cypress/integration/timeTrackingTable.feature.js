describe('Display time tracking table', () => {

  it('when user visits the page', () => {
		cy.visit('http://localhost:3000')
		cy.get('div[name="timetracking"]')
			.should('contain', 'Time Tracking')

		cy.get('thead[name="tableHeader"').within(() => {
			cy.get('tr').within(() => {
			cy.get('th')
				.should('have.length', 8)
			})
		})
	})
})
