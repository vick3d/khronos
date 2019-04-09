import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTimeData } from "../modules/kimaiGetTimeData";
import moment, { months } from 'moment';


class Chart extends Component {
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
		

		// let projects = [
		// 	{ name: "Project 1", begin: "2018-04-18 07:00" },
		// 	{ name: "Project 2", begin: "2018-06-30" },
		// 	{ name: "Another project", begin: "2018-04-03" },
		// 	{ name: "Internal", begin: "2018-05-03" },
		// 	{ name: "Late", begin: "2018-12-03" }]
		
		let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		
		
		let result = this.state.timeData.reduce((array, project) => {
			let monthIndex = new Date(project.begin).getMonth(); // get month number zero based
			debugger;
			if (!array[monthIndex]) {      // check month if exist in result set
				array[monthIndex] = [monthNames[monthIndex], []];            // if not create a new result set
			}
			array[monthIndex][1].push(project);                 // push the actual project 
			return array;                             // return temporary result
		}, []).filter(Boolean);                   // filter only months with values
	
		console.log(result);	
		return (
			<>
				<h1>Hej hej</h1>
				
			</>
		)
	}
}

export default Chart;