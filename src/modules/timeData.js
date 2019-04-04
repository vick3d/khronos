import axios from 'axios'


const saveData = (values) => {
	const apiUrl = 'https://demo.kimai.org/api/'
	const username = "susan_super"
	const password = "api_kitten"
	const { begin,
					end,
					customer,
					project,
					activity,
					description,
					fixedRate,
					hourlyRate } = values

	const headers = { "X-AUTH-USER": username,
										"X-AUTH-TOKEN": password
	}

	return new Promise((resolve, reject) => {
		axios.post(apiUrl + 'timesheets', {
								begin: begin,
								end: end,
								customer: customer,
								project: project,
								activity: activity,
								description: description,
								fixedRate: fixedRate,
								hourlyRate: hourlyRate
						},{
								headers: headers,
								mode: "cors",
							})
		.then(response => {
			console.log(response.data)
			resolve(response.data);
		});
	});
};

export {saveData}
