import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";


class Chart extends Component {
	state = {
    timeData: [],
	};
	
	componentDidMount() {
		getTimeData().then(
			response => {
				this.setState({
					timeData: response
				})
			}
		);
	}

	render() {
		return (
			<>
      <h1>Hej hej</h1>
			</>
		)
	}
}

export default Chart;