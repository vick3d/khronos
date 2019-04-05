import React, { Component } from 'react';
import { Table, Input, Dropdown, Button } from 'semantic-ui-react'
import { saveData } from '../modules/kimaiSaveTimeData'
import SavedTimesList from './savedTimesList';
import { getTimeData } from '../modules/kimaiGetTimeData';

export class TimeTrackingTable extends Component  {

	constructor(props) {
		super(props)
		this.state = {
			begin: '',
			end: '',
			customer: '',
			project: '',
			activity: '',
			description: '',
			fixedRate: '',
			hourlyRate: '',
			entrySaved: false,
			timeData: []
    }
	}

	componentDidMount(){
		getTimeData().then( (response) => {
				this.setState({
					timeData: response
				});
			},
			(reason) => {
				console.log("something went wrong")
			}		
		)
	}

	renderTimeSheet(){
		const timeData = this.state.timeData;
		return timeData.map((entry)=> {
			return (
				<Table.Row>

				<Table.Cell>
					{entry.begin}
				</Table.Cell>
				<Table.Cell>
					{entry.end}
				</Table.Cell>
				<Table.Cell>
					{entry.rate}
				</Table.Cell>
				<Table.Cell>
					{entry.customer}
				</Table.Cell>
				<Table.Cell>
					{entry.project}
				</Table.Cell>
				<Table.Cell>
					{entry.activity}
				</Table.Cell>


				</Table.Row>

		)
		})
	}

	entryHandler(e) {
		this.setState({ entrySaved: true })
	}

	updateTimeDataHandler(data){
		let timeData = this.state.timeData;
		timeData.push(data);
		this.setState({
			timeData: timeData
		})
	}

	async saveTimeData() {
		const values = {
			begin: this.state.begin,
  		end: this.state.end,
			customer: this.state.customer,
			project: this.state.project,
			activity: this.state.activity,
			description: "description",
			fixedRate: "0.0",
			hourlyRate: this.state.hourlyRate
		}
    try {
			await saveData(values).then( response => {
				if (response.message === "Entry saved"){
					this.entryHandler();
					this.updateTimeDataHandler(response.data);
				} else {
					alert(response.message)
				}
			});
    } catch(error) {
			console.log(error);
    }
	}

	handleCustomerChange(value) {
		this.setState({ customer: value})
	}

	handleProjectChange(value) {
		this.setState({ project: value})
	}

	handleActivityChange(value) {
		this.setState({ activity: value})
	}

	render() {
		let saveButton;

		const customerOptions = [
			{ text: "Company 1", value: "1" },
			{ text: "Company 2", value: "2" },
			{ text: "Company 3", value: "3" },
			{ text: "Company 4", value: "4" }
		]
		const projectOptions = [
			{ text: "Project 1", value: "1" },
			{ text: "Project 2", value: "2" },
			{ text: "Project 3", value: "3" },
			{ text: "Project 4", value: "4" }
		]
		const taskOptions = [
			{ text: "Task 1", value: "1" },
			{ text: "Task 2", value: "2" },
			{ text: "Task 3", value: "3" },
			{ text: "Task 4", value: "4" }
		]

		if (this.state.entrySaved === false) {
			saveButton = (
				<>
					<Button onClick={this.saveTimeData.bind(this)}>Save</Button>
				</>
			)
		} else if (this.state.entrySaved === true) {
			// saveButton = (
			// 	<>
			// 		<p>Your time was saved</p>
			// 	</>
			// )
		}

		let listEntries =	this.renderTimeSheet();

		return(
			<>
			<Table celled>
				<Table.Header name="tableHeader">
					<Table.Row name="tableRow">
						<Table.HeaderCell>Start Time</Table.HeaderCell>
						<Table.HeaderCell>End Time</Table.HeaderCell>
						<Table.HeaderCell>Rate</Table.HeaderCell>
						<Table.HeaderCell>Customer</Table.HeaderCell>
						<Table.HeaderCell>Project</Table.HeaderCell>
						<Table.HeaderCell>Task</Table.HeaderCell>
						<Table.HeaderCell> </Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<Input
								id='begin'
								placeholder='YYYY-MM-DD HH:MM'
								onChange={(e) => this.setState({ begin: e.target.value, entrySaved: false})}
							/>
						</Table.Cell>
						<Table.Cell>
							<Input
								id='end'
								placeholder='YYYY-MM-DD HH:MM'
								onChange={(e) => this.setState({ end: e.target.value, entrySaved: false})}
							/>
						</Table.Cell>
						<Table.Cell>
							<Input
								id='hourlyRate'
								placeholder='$'
								onChange={(e) => this.setState({ hourlyRate: e.target.value, entrySaved: false})}
							/>
						</Table.Cell>
						<Table.Cell>
							<Dropdown
								id='customer'
								className = 'customer'
								selection
								defaultValue=''
								options={customerOptions}
								onChange={(e,{value}) => this.handleCustomerChange(value)}
							/>
						</Table.Cell>
						<Table.Cell>
							<Dropdown
								id='project'
								className= 'project'
								selection
								defaultValue=''
								options={projectOptions}
								onChange={(e,{value}) => this.handleProjectChange(value)}
							/>
						</Table.Cell>
						<Table.Cell>
							<Dropdown
								id='activity'
								className= 'activity'
								selection
								defaultValue=''
								options={taskOptions}
								onChange={(e,{value}) => this.handleActivityChange(value)}
							/>
						</Table.Cell>
						<Table.Cell>
							{saveButton}
						</Table.Cell>
					</Table.Row>
					{listEntries}

				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell textAlign='center' colSpan='7'>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>

			</>
		)
	}
}
