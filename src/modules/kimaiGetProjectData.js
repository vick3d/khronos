import axios from "axios";

const getProjectData = (customerId) => {
	const apiUrl = "https://demo.kimai.org/api";
	const customer = customerId;
	const username = localStorage.getItem("Name");
	const password = localStorage.getItem("Password");
	const headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	return new Promise((resolve, reject) => {
		axios
			.get(apiUrl + "/projects?customer=" + customer, {
				headers: headers
			})
			.then(response => {
				resolve(response);
			})
			.catch(errors => {
				resolve({ message: "Could not fetch project data at this time." });
			});
	});
};

export { getProjectData };