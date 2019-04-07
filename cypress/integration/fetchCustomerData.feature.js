describe("User can fetch customer data", () => {
	beforeEach(function() {
		cy.server();
		cy.route({
			method: "GET",
			url: "https://demo.kimai.org/api/version",
			response: "fixture:login.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		});
		cy.route({
			method: "GET",
			url: "https://demo.kimai.org/api/customers",
			response: "fixture:fetchCustomers.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		})
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

	it("User can fetch customer data", () => {
		cy.server();
		cy.route({
			method: "GET",
			url: "https://demo.kimai.org/api/customers",
			response: "fixture:fetchCustomers.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		});

		cy.get(".customer > .dropdown").click();
		cy.contains("Borer-Abbott");
		cy.contains("Block, Dach and Harris");
		cy.contains("Cronin, Eichmann and Davis");
	});
});
