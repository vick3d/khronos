import moment from 'moment-timezone'

describe('User can save time from navbar', () => {

	beforeEach(function () {
		cy
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
			.get('button[name="time_tracking"]').click();

	})

	it('User can save time from navbar', () => {
		const begin =  moment.tz("2019-03-28 12:00", "Europe/Stockholm").valueOf()
		const stub = cy.stub()

		cy.on('window:alert', stub)
		cy.clock(begin)
		cy.get('#play').click()
		cy.then(() => {
			expect(stub.getCall(0)).to.be.calledWith("Started recording");
		})
		cy.tick(1000 * 60 * 60 * 2)
		cy.get('#stop').click()
		cy.then(() => {
			expect(stub.getCall(1)).to.be.calledWith("Stopped recording.\nPlease add work details before submission.");
		})
		cy.get('input[id="begin"]').should('have.value', '2019-03-28 12:00');
		cy.get('input[id="end"]').should('have.value', '2019-03-28 14:00');
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
})