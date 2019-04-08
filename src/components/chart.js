import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";


class Chart extends Component {
  
	render() {
		return (
			<>
      <h1>Hej hej</h1>
      <Doughnut />
			</>
		)
	}
}

export default Chart;