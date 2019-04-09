import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";
import moment from 'moment';

class TotalTimeChart extends Component {
	state = {
		timeData: [],
	};

	componentDidMount() {
		getTimeData().then(
			response => {
				this.setState({
					timeData: response
				});
			},
			reason => {
				console.log("something went wrong");
			}
		);
	}

	render() {
		let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

		let result = this.state.timeData.reduce(
			(array, entry) => {

				let year = new Date(entry.begin).getFullYear();
				let currentYear = new Date().getFullYear();
				let monthIndex = new Date(entry.begin).getMonth();

				if (year !== currentYear) {
					return array
				}

				if (!array[monthIndex]) {
					array[monthIndex] = []
				}

				array[monthIndex].push(entry)

				return array;
			}, [])

		const hoursPerMonth = result.map(monthEntries => {
			return monthEntries.reduce((sum, entry) => {
				const begin = moment(entry.begin)
				const end = moment(entry.end)
				const hours = moment.duration(end.diff(begin)).asHours()
				return sum + hours
			}, 0)
		});

		return (
			<>
				<Bar
					width={100}
					height={50}
					options={{
						responsive: true,
						maintainAspectRatio: false,
						legend: {
							display: true,
							position: 'bottom'
						},
						scales: {
							yAxes: [{
								scaleLabel: {
									display: true,
									labelString: 'Time(total)'
								}
							}]
						}
					}}
					data={{ datasets: [{ data: hoursPerMonth, label: "Total working time spent on projects per month (current year)" }], labels: monthNames }} />
			</>
		)
	}
}

export default TotalTimeChart;