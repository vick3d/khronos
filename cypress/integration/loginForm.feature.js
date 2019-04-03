describe('Login form', () => {
	it('when user logs in', () => {
    cy.visit('http://localhost:3000')
      .get('button').contains('Get started here!').click()
      .get('name').type('susan_super')
      .get('password').type('api_kitten')
      .get('button').contains('Login').click()
      .should('contain', 'You are logged in!')
	})
})