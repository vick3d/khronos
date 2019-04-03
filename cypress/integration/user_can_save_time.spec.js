describe('User can save time', () => {
	it('User logs in and input time', () => {

		cy.server();
		cy.route({
			method: 'POST',
			url: 'https://demo.kimai.org/api/timesheets',
			response: 'fixture:save_data.json',
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		})


			cy.visit('http://localhost:3000')
			cy.get('input[id="begin"]').type('2019-03-28 12:00');
			cy.get('input[id="end"]').type('2019-03-28 14:00');
			cy.get('input[id="hourlyRate"]').type('100.0');
			cy.get(".customer > .dropdown").click();
			cy.contains("Company 2").click();
			cy.get('.project > .dropdown').click();
			cy.contains("Project 2").click();
			cy.get('.activity > .dropdown').click();
			cy.contains("Task 2").click();
			cy.contains("Save").click();
	})
})