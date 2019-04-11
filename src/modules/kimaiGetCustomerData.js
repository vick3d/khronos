import axios from "axios";

const getData = () => {
	const apiUrl = "https://demo.kimai.org/api";
	const username = localStorage.getItem("Name");
	const password = localStorage.getItem("Password");
	const headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	return new Promise((resolve, reject) => {
		axios
			.get(apiUrl + "/customers?visible=3", {
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
