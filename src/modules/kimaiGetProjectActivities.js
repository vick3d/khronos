import axios from "axios";

const getProjectActivities = projectId => {
	const apiUrl = "https://demo.kimai.org/api";
	let activityUrl;
	if (projectId == "all") {
		activityUrl = apiUrl + "/activities?visible=3";
	} else {
		activityUrl = apiUrl + "/activities?project=" + projectId;
	}
	const username = localStorage.getItem("Name");
	const password = localStorage.getItem("Password");
	const headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	return new Promise((resolve, reject) => {
		axios
			.get(activityUrl, {
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
