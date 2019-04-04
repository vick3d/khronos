describe('Login form', () => {
	it('when user logs in', () => {
		const stub = cy.stub()
		cy.on ('window:alert', stub)

    cy.visit('http://localhost:3000')
      .get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
			.wait(1000)
			.get('button').contains('Get started here!').click()
			.then(() => {
      	expect(stub.getCall(0)).to.be.calledWith('You are already logged in!')
    	})
	})
	it('user enters wrong credentials', () => {
		const stub = cy.stub()
		cy.on ('window:alert', stub)

    cy.visit('http://localhost:3000')
      .get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_bad')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
			.wait(1000)
			.then(() => {
      	expect(stub.getCall(0)).to.be.calledWith('Invalid credentials')
    	})
	})
})