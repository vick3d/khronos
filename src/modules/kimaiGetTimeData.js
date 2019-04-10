import axios from "axios";

export const getTimeData = (user) => {
	let apiUrl = 'https://demo.kimai.org/api/timesheets'
	if (user) {
		apiUrl += `?user=${user}`
	}

	let headers = {
		"X-AUTH-USER": localStorage.getItem("Name"),
		"X-AUTH-TOKEN": localStorage.getItem("Password")
	};

	return new Promise((resolve, reject) => {
		axios
			.get(apiUrl, {
				headers: headers
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error.response.data);
			});
	});
};
