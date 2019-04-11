describe('User can logout', () => {
	it('when user logs in and logs out', () => {
		cy
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
			.get('.message').should("be.visible").contains("Welcome, susan_super!")
      .get('.menu > :nth-child(2) > .white').click()     
      .get(".sign-in").should("be.visible");
	})
})