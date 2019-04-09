import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";
import moment from 'moment';


class TodayTime extends Component {
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

		let todayEntries = this.state.timeData.reduce((array, entry) => {

			let date = new Date(entry.begin)
			date.setHours(0, 0, 0, 0);
			let currentDate = new Date()
			currentDate.setHours(0, 0, 0, 0);
			if (date.getTime() !== currentDate.getTime()) {
				return array
			}

			array.push(entry)

			return array;
		}, [])
		const hoursPerDay = todayEntries.reduce((sum, entry) => {
			const begin = moment(entry.begin)
			const end = moment(entry.end)
			const hours = moment.duration(end.diff(begin)).asHours()
			return sum + hours
		}, 0)

		return (
			<>
				{hoursPerDay}
			</>
		)
	}
}

export default TodayTime;