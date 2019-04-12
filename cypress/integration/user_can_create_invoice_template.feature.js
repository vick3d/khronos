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
			.get(".project > .dropdown").click()
			.contains("Compatible 24hour throughput").click()
			.get('tr[id="1794"]').find('td[class=""]')
			.find('div[class="ui fitted toggle checkbox toggle"]')
			.click()
			.get('button[name="create_invoice"]').click()
		cy.get(':nth-child(5) > :nth-child(1)')
			.should('contain', 'Total Working Hours')
			.get('p')
			.should('contain', '2 hours 0 minutes')
		cy.get(':nth-child(5) > :nth-child(2)')
			.should('contain', 'Price')
		cy.get('.item > :nth-child(2)')
			.should('contain', '100')
	})
})