describe('User can create invoice template', () => {
	beforeEach(function () {
		cy
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
			.get('button[name="invoicing"]').click();
	})

	it('user can add times to invoice', () => {
		cy.get(".customer > .dropdown").click()
			.contains("Beer and Sons").click()
	})
})