describe('User can create invoice template', () => {
	beforeEach(function () {
		cy
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
			.get('button[name="invoices"]').click();
	})

	it('user can add time to invoiceline', () => {
		cy.get('input[id="project"]').type('project-name');
		cy.get('input[id="activity"]').type('activity');
		cy.get('input[id="duration"]').type('4h');
		cy.get('input[id="rate"]').type('rate')
		cy.get('total')
		cy.contains("483 SEK")
		cy.get('button[name="create_invoice').click();
	})

})