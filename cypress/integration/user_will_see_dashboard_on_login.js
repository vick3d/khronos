describe('Display dashboard on login', () => {
	beforeEach(function() {
		cy
			.get("button")
			.contains("Get started here!")
			.click()
			.get(":nth-child(1) > .ui > input")
			.type("susan_super")
			.get(":nth-child(2) > .ui > input")
			.type("api_kitten")
			.get("button")
			.contains("Login")
			.click();
	});

	it('user sees his/hers dashboard', () => {
		cy
		cy.get('h1[name="header"]')
			.should('contain','My Dashboard')
		cy.get('button[name="time_tracking"]')
			.find("img")
			.should('be.visible');
		cy.get('button[name="statistics"]')
			.find("img")
			.should('be.visible');
	})

	it('user can navigate back to dashboard by clicking the logo', () => {
		cy
			.get('button[name="time_tracking"]').click()
			.get('img[id="logo"]').click();
		cy
			.get('h1[name="header"]')
			.should('contain','My Dashboard')
	})
})