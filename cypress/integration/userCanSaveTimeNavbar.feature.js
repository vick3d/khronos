describe('User can save time', () => {

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

	it('User can save time', () => {
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
		cy.contains('icon[id="play']).click()
		cy.contains("Started recording")
		cy.get('input[id="begin"]').contains('2019-03-28 12:00');
		cy.contains('icon[id="stop']).click()
		cy.contains("Stopped recording. Please add work details before submission.")
		cy.get('input[id="end"]').contains('2019-03-28 14:00');

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

	it('User cannot save time with invalid details', () => {
		cy.server();
		cy.route({
			method: 'POST',
			url: 'https://demo.kimai.org/api/timesheets',
			status: '400',
			response: { message: 'Validation Failed' },
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		})

		const stub = cy.stub()
		cy.on('window:alert', stub)

		cy.contains('icon[id="play']).click()
		cy.contains("Started recording")
		cy.get('input[id="begin"]').contains('2019-03-28 12:00');
		cy.contains('icon[id="stop']).click()
		cy.contains("Stopped recording. Please add work details before submission.")
		cy.get('input[id="end"]').contains('2019-03-28 14:00');

		cy.get('input[id="hourlyRate"]').type(null);
		cy.get(".customer > .dropdown").click();
		cy.contains("Company 2").click();
		cy.get('.project > .dropdown').click();
		cy.contains("Project 2").click();
		cy.get('.activity > .dropdown').click();
		cy.contains("Task 2").click();
		cy.contains("Save").click()
			.wait(1000)
			.then(() => {
				expect(stub.getCall(0)).to.be.calledWith("Couldn't save. Did you fill in the details with the correct formatting?");
			})
	})
})