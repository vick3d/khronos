import moment from 'moment-timezone'

describe('User can save time from navbar', () => {

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

	it('User can save time from navbar', () => {
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
		const begin =  moment.tz("2019-03-28 12:00", "Europe/Stockholm").valueOf()
		cy.clock(begin)
		cy.get('#play').click()
		// cy.contains("Started recording")
		// 1000 = 1 second
		cy.tick(1000 * 60 * 60 * 2)
		cy.get('#stop').click()
		// cy.contains("Stopped recording. Please add work details before submission.")
		cy.get('input[id="begin"]').should('have.value', '2019-03-28 12:00');
		cy.get('input[id="end"]').should('have.value', '2019-03-28 14:00');

		cy.get('input[id="hourlyRate"]').type('100.0');
		cy.get(".customer > .dropdown").click();
		cy.contains("Company 2").click();
		cy.get('.project > .dropdown').click();
		cy.contains("Project 2").click();
		cy.get('.activity > .dropdown').click();
		cy.contains("Task 2").click();
		cy.contains("Save").click();
		cy.contains("Your time was saved")
	})
})