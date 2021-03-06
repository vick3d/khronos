describe("User can fetch project data", () => {
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
			.get('button[name="time_tracking"]')
			.click();
	});

	it("User can fetch project data", () => {
		cy.get(".customer > .dropdown").click();
		cy.contains("Beer and Sons").click();
		cy.get(".project > .dropdown").click();
		cy.contains("Assimilated coherent functionalities");
		cy.contains("Cloned systematic groupware");
		cy.contains("Compatible 24hour throughput");
		cy.contains("Down-sized logistical strategy");
	});
});