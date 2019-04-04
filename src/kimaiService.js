import axios from "axios";

export const login = async (userName, userPassword) => {
  const apiUrl = 'https://demo.kimai.org/api/version'
  let headers = {
    "X-AUTH-USER":userName,
    "X-AUTH-TOKEN":userPassword
	}

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        headers: headers
      })
      .then(response => {
				console.log(response.data)
				resolve({message: "Successfull"});
      })
      .catch(error => {
				debugger
        resolve(error.response.data)
      })
  });
};