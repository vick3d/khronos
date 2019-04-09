import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";
import moment from 'moment';


class TotalMoneyChart extends Component {
	state = {
		timeData: [],
	};

	componentDidMount() {
		getTimeData().then(
			response => {
				debugger
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

		// let projects = [
		// 	{ name: "Project 1", begin: "2019-04-18 07:00", end: "2019-04-18 08:00" },
		// 	{ name: "Project 2", begin: "2018-06-30 06:00", end: "2018-06-30 08:00" },
		// 	{ name: "Another project", begin: "2018-04-03 8:00", end: "2018-04-03 9:00" },
		// 	{ name: "Internal", begin: "2018-05-03" },
		// 	{ name: "Late", begin: "2018-12-03" }]

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

		const moneyPerMonth = result.map(monthEntries => {
			return monthEntries.reduce((sum, entry) => {
				const money = entry.rate
				return sum + money
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
									labelString: 'Money(total)'
								}
							}]
						}
					}}
					data={{ datasets: [{ data: moneyPerMonth, label: "Total money earned from projects per month (current year)" }], labels: monthNames }} />
			</>
		)
	}
}

export default TotalMoneyChart;