import axios from 'axios'

export const getTimeData = () => {
	const apiUrl = 'https://demo.kimai.org/api/timesheets'
	// const username = "susan_super"
	// const password = "api_kitten"
	// const { begin,
	// 	end,
	// 	customer,
	// 	project,
	// 	activity,
	// 	description,
	// 	fixedRate,
	// 	hourlyRate } = values

	let headers = {
    "X-AUTH-USER":localStorage.getItem("Name"),
    "X-AUTH-TOKEN":localStorage.getItem("Password")
	}

	return new Promise((resolve, reject) => {
		axios.get(apiUrl, {
			headers: headers
		},
		{
			headers: headers,
			mode: "cors",
		})
		.then(response => {
			debugger
			resolve({message: "Entry successfully retrieved"});
		})
		.catch(error => {
			resolve({message: "Couldn't retrieve data. Try again"})
		});
	});
};