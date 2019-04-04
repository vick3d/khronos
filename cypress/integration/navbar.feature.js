describe("Display Navbar", () => {
	it("when user navigates the site", () => {
		cy.visit("http://localhost:3000");
		cy.get("#logo").should("be.visible");
		cy.get(".sign-in").should("be.visible");
		cy.get(".sign-out").should("not.be.visible");
		cy.get(".play").should("not.be.visible");
		cy.get(".stop").should("not.be.visible");
		cy.get(".help").should("be.visible");
		cy.get(".calendar").should("not.be.visible");

	});
});


const userLogsIn