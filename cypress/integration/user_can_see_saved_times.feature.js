describe('User can see saved times', () => {

	beforeEach(function () {
		cy
    .get('button').contains('Get started here!').click()
    .get(':nth-child(1) > .ui > input').type('susan_super')
    .get(':nth-child(2) > .ui > input').type('api_kitten')
    .get('button').contains('Login').click()
	})
	it('User can see saved times', () => {
		cy.get('input[id="begin"]').type('2019-03-28 11:00')
		cy.get('input[id="end"]').type('2019-03-28 13:00')
		cy.get('input[id="hourlyRate"]').type('100.0')
		cy.get(".customer > .dropdown").click()
		cy.contains("Bernier Group").click()
		cy.get('.project > .dropdown').click()
		cy.contains("Project 2").click()
		cy.get('.activity > .dropdown').click()
		cy.contains("Task 2").click()
		cy.contains("Save").click()
		cy.contains("Your time was saved")
		cy.wait(1000)
		cy.get(':nth-child(2) > #beginSave').should('contain', '2019-03-28 11:00')
		cy.get(':nth-child(2) > #endSave').should('contain', '2019-03-28 13:00')
		cy.get('tbody > :nth-child(2) > :nth-child(5)').should('contain', '1')
		cy.get('tbody > :nth-child(2) > :nth-child(6)').should('contain', '1')
	})
})
