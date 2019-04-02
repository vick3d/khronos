import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
	state = {
    message: ""
  }
  componentDidMount() {
    this.fetchPong()
	}

	async fetchPong() {
		let username = "susan_super"
		let password = "api_kitten"
		let pong = await axios.get('http://demo.kimai.org/api/ping')
		this.setState({})
	}

  render() {
    return (
      <div className="App">
      </div>
    );
	}
	
	const getData = async () => {
		let headers = await sessionStorage.getItem("credentials");
		headers = JSON.parse(headers);
		headers = {
			...headers,
			"Content-type": "application/json",
			Accept: "application/json"
		};

}

export default App;
