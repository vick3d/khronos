import axios from 'axios'


const saveData = (values) => {
	let apiUrl = ''
	const proxyUrl = "https://cors-anywhere.herokuapp.com/"
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

	debugger;

	if(process.env.NODE_ENV === "development") {
			apiUrl = proxyUrl + 'http://demo.kimai.org/api/'
	} else {
			apiUrl = 'https://demo.kimai.org/api/'
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
                },
          {
          headers: headers
            })
    .then(response => {
            debugger;
      resolve(response.data);
    });
  });
};

export { saveData }