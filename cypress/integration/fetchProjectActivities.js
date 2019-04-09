describe("User can fetch project activities data", () => {
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

	it("User can fetch project activities data", () => {
		cy.get(".customer > .dropdown").click();
		cy.contains("Beer and Sons").click();
		cy.get(".project > .dropdown").click();
		cy.contains("Cloned systematic groupware").click();
		cy.get(".activity > .dropdown").click();
		cy.contains("empower clicks-and-mortar web-readiness");
		cy.contains("engineer best-of-breed synergies");
		cy.contains("matrix leading-edge communities");
		cy.contains("maximize seamless systems");
	});
});