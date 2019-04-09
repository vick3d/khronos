describe("User can fetch customer data", () => {
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
			.click()
			.get('button'[name="time_tracking"])
			.click();
	});

	it("User can fetch customer data", () => {
		cy.get(".customer > .dropdown").click();
		cy.contains("Altenwerth PLC");
		cy.contains("Beer and Sons");
		cy.contains("Bernier Group");
		cy.contains("Borer, Schuster and Hagenes");
		cy.contains("Conroy LLC");
		cy.contains("Grady LLC");
		cy.contains("McClure Inc");
		cy.contains("Mohr-Auer");
		cy.contains("Robel, Reynolds and Ryan");
	});
});
