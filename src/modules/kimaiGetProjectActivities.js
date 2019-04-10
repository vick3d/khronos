import axios from "axios";

const getProjectActivities = (projectId) => {
	const apiUrl = "https://demo.kimai.org/api";
	const project = projectId;
	const username = localStorage.getItem("Name");
	const password = localStorage.getItem("Password");
	const headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	return new Promise((resolve, reject) => {
		axios
			.get(apiUrl + "/activities?project=" + project, {
				headers: headers
			})
			.then(response => {
				resolve(response);
			})
			.catch(errors => {
				resolve({ message: "Could not fetch activity data at this time." });
			});
	});
};

export { getProjectActivities };