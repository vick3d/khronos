describe('User can fetch customer data', () => {

	beforeEach(function () {
		cy.server();
		cy.route({
				method: "GET",
				url: "https://demo.kimai.org/api/version",
				response: "fixture:login.json",
				headers: {
					"X-AUTH-USER": "susan_super",
					"X-AUTH-TOKEN": "api_kitten"
				}
			})
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
	})

	it('when user visits the page and logs in', () => {
		cy.get('div[name="timetracking"]')
			.should('contain', 'Time Tracking')
		cy.get('thead[name="tableHeader"').within(() => {
			cy.get('tr').within(() => {
				cy.get('th')
					.should('have.length', 7)
			})
		})
	})

	it('User can fetch customer data', () => {
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

		cy.get('input[id="begin"]').type('2019-03-28 12:00');
		cy.get('input[id="end"]').type('2019-03-28 14:00');
		cy.get('input[id="hourlyRate"]').type('100.0');
		cy.get(".customer > .dropdown").click();
		cy.contains("Borer-Abbott").click();
		cy.get('.project > .dropdown').click();
		cy.contains("Project 2").click();
		cy.get('.activity > .dropdown').click();
		cy.contains("Task 2").click();
		cy.contains("Save").click();
		cy.contains("Your time was saved")
	})


})