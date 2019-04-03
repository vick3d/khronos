describe('User can save time', () => {
	it('User logs in and input time', () => {
			cy.visit('http://localhost:3000')
			cy.get('input[id="begin"]').type('2019-03-28 12:00');
			cy.get('input[id="end"]').type('2019-03-28 14:00');
			cy.get('input[id="hourlyRate"]').type('100.0');
			cy
				.get('.customer > .dropdown')
				.click()
				.get('div[class="menu"]')
				.contains('Company 1');
			cy.get('.project > .dropdown').click();
			cy.contains('Project 1').click();
			cy.get('.activity > .dropdown').click();
			cy.contains('Task 1').click();
			cy.contains('Save').click();
	})
})