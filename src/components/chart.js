import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";
import moment, { months } from 'moment';


class Chart extends Component {
	state = {
		timeData: [],
	};
	sumByMonth = array =>
		array.reduce((sumByMonth, obj) => {
			const month = obj['month'];
			const hours = obj['hours'];
			sumByMonth[month] = (sumByMonth[month] || 0) + hours;
			return sumByMonth;
		}, {});

	componentDidMount() {
		getTimeData().then(
			response => {
				const hoursCount = (response.map((timesheet) => {
					const begin = moment(timesheet.begin)
					const end = moment(timesheet.end)
					const hours = moment.duration(end.diff(begin)).asHours()
					return {
						hours: hours,
						month: begin.month()
					}
				}))
				const hoursByMonth = this.sumByMonth(hoursCount)
				// debugger
				this.setState({
					timeData: Object.keys(hoursByMonth).map((key) => {
						return {x: key, y: hoursByMonth[key]}
					})
				})
			}
		);
	}
	// datasets: [{
	// 	data: distances,
	// 	label: "My progress"
	// }],

	render() {
		return (
			<>
				<h1>Hej hej</h1>
				<Bar data={{ datasets: [{ data: Object.values(this.state.timeData), labels: [Object.keys(this.state.timeData)]}]}} />
			</>
		)
	}
}

export default Chart;