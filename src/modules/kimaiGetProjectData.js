import axios from "axios";

const getProjectData = customerId => {
	const apiUrl = "https://demo.kimai.org/api";
	let projectUrl;
	if (customerId === "all") {
		projectUrl = apiUrl + "/projects?visible=3";
	} else {
		projectUrl = apiUrl + "/projects?customer=" + customerId;
	}
	const username = "susan_super";
	const password = "api_kitten";
	const headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	return new Promise((resolve, reject) => {
		axios
			.get(projectUrl, {
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
