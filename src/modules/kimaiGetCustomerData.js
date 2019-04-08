import axios from "axios";

const getData = () => {
	const apiUrl = "https://demo.kimai.org/api";
	const username = "susan_super";
	const password = "api_kitten";
	const headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	return new Promise((resolve, reject) => {
		axios
			.get(apiUrl + "/customers", {
				headers: headers
			})
			.then(response => {
				resolve(response);
			})
			.catch(errors => {
				resolve({ message: "Could not fetch customer data at this time." });
			});
	});
};

export { getData };
