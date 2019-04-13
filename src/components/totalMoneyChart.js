import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";
import { red } from 'ansi-colors';

class TotalMoneyChart extends Component {
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

		const moneyPerMonth = result.map(monthEntries => {
			return monthEntries.reduce((sum, entry) => {
				const money = entry.rate
				return sum + money
			}, 0)
		});

		return (
			<>
				<Bar
					options={{
						responsive: true,
						maintainAspectRatio: true,
						legend: {
							display: true,
							position: 'bottom',
						},
						scales: {
							yAxes: [{
								scaleLabel: {
									display: true,
									labelString: 'Money(total)',
								}
							}]
						}
					}}
					data={{ datasets: [{ data: moneyPerMonth,   backgroundColor: [
            '#42f474',
            '#2dff68',
            '#50c972',
            '#11d849',
            '#0cff50',
          ], label: "Total money earned from projects per month (current year)" }], labels: monthNames }} />
			</>
		)
	}
}

export default TotalMoneyChart;