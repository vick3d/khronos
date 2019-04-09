describe('User can save time', () => {
	beforeEach(function () {
		cy
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
			.get('button'[name="time_tracking"]).click()
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
		cy.get('input[id="begin"]').type('2019-03-28 12:00');
		cy.get('input[id="end"]').type('2019-03-28 14:00');
		cy.get('input[id="hourlyRate"]').type('100.0');
		cy.get(".customer > .dropdown").click();
		cy.contains("Beer and Sons").click();
		cy.get('.project > .dropdown').click();
		cy.contains("Cloned systematic groupware").click();
		cy.get('.activity > .dropdown').click();
		cy.contains("engineer best-of-breed synergies").click();
		cy.contains("Save").click();
		cy.contains("Your time was saved")
	})

	it('User cannot save time with invalid details', () => {
		cy.server();
		cy.route({
			method: 'POST',
			url: 'https://demo.kimai.org/api/timesheets',
			status: '400',
			response: {
				message: 'Validation Failed'
			},
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		})

		const stub = cy.stub()
		cy.on('window:alert', stub)
		cy.get('input[id="begin"]').type('starttime');
		cy.get('input[id="end"]').type('2019-03-28 14:00');
		cy.get('input[id="hourlyRate"]').type('100.0');
		cy.get(".customer > .dropdown").click();
		cy.contains("Beer and Sons").click();
		cy.get('.project > .dropdown').click();
		cy.contains("Cloned systematic groupware").click();
		cy.get('.activity > .dropdown').click();
		cy.contains("engineer best-of-breed synergies").click();
		cy.contains("Save").click()
			.wait(1000)
			.then(() => {
				expect(stub.getCall(0)).to.be.calledWith("Couldn't save. Did you fill in the details with the correct formatting?");
			})
	})
})