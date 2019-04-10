import React, { Component } from 'react';
import { getTimeData } from "../modules/kimaiGetTimeData";

class TodayMoney extends Component {
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
		const moneyPerDay = todayEntries.reduce((sum, entry) => {
			return sum + entry.rate
		}, 0)

		return (
			<>
				{moneyPerDay} SEK
			</>
		)
	}
}

export default TodayMoney;