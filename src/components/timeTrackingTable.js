import React, { Component } from "react";
import { Table, Input, Dropdown, Button, Segment, Header } from "semantic-ui-react";
import { saveData } from "../modules/kimaiSaveTimeData";
import { getData } from "../modules/kimaiGetCustomerData";
import { getProjectData } from "../modules/kimaiGetProjectData";
import { getProjectActivities } from "../modules/kimaiGetProjectActivities";
import { getTimeData } from "../modules/kimaiGetTimeData";
import moment from "moment-timezone";

export class TimeTrackingTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			begin: "",
			end: "",
			customer: "",
			project: "",
			activity: "",
			description: "",
			fixedRate: "",
			hourlyRate: "",
			entrySaved: false,
			fetchedCustomers: [],
			timeData: [],
			fetchedProjects: [],
			fetchedActivities: []
		};
	}

	componentDidMount() {
		this.getCustomerData();
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

	componentDidUpdate(oldProps) {
		if (oldProps.begin !== this.props.begin && oldProps.end !== this.props.end) {
			this.setState({ begin: this.props.begin, end: this.props.end })
		}
	}

	entryHandler(e) {
		this.setState({ entrySaved: true });
	}

	handleCustomerChange(value) {
		this.setState({ customer: value });
		this.getProjects(value)
	}

	handleProjectChange(value) {
		this.setState({ project: value });
		this.getActivities(value);
	}

	handleActivityChange(value) {
		this.setState({ activity: value });
	}

	renderTimeSheet() {
		const timeData = this.state.timeData;
		return timeData.map((entry) => {
			return (
				<Table.Row>
					<Table.Cell id='beginSave'>
						{moment(entry.begin).tz("Europe/Stockholm").format('YYYY-MM-DD HH:mm')}
					</Table.Cell>
					<Table.Cell id='endSave'>
						{moment(entry.end).tz("Europe/Stockholm").format('YYYY-MM-DD HH:mm')}
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

	async getCustomerData() {
		try {
			await getData().then(response => {
				if (
					response.message === "Could not fetch customer data at this time."
				) {
					alert(response.message);
				} else {
					{
						let responseArray = response.data;
						let companyArray = responseArray.map(company => {
							let rCompany = {};
							rCompany["text"] = company.name;
							rCompany["value"] = company.id;
							return rCompany;
						});
						this.setState({ fetchedCustomers: companyArray });
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async getProjects(value) {
		const customerId = value
		try {
			await getProjectData(customerId).then(response => {
				if (
					response.message === "Could not fetch project data at this time."
				) {
					alert(response.message);
				} else {
					{
						let responseArray = response.data;
						let projectsArray = responseArray.map(project => {
							let rProject = {};
							rProject["text"] = project.name;
							rProject["value"] = project.id;
							return rProject;
						});
						this.setState({ fetchedProjects: projectsArray });
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async getActivities(value) {
		const projectId = value
		try {
			await getProjectActivities(projectId).then(response => {
				if (
					response.message === "Could not fetch activity data at this time."
				) {
					alert(response.message);
				} else {
					{
						let responseArray = response.data;
						let activitiesArray = responseArray.map(activity => {
							let rActivity = {};
							rActivity["text"] = activity.name;
							rActivity["value"] = activity.id;
							return rActivity;
						});
						this.setState({ fetchedActivities: activitiesArray });
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	}


	updateTimeDataHandler(data) {
		let timeData = this.state.timeData;
		timeData.push(data);
		const newTimeData = [data, ...timeData];
		this.setState({
			timeData: newTimeData
		});
	}

	async saveTimeData() {
		const values = {
			begin: this.state.begin,
			end: this.state.end,
			customer: this.state.customer,
			project: this.state.project,
			activity: this.state.activity,
			description: "description",
			fixedRate: "",
			hourlyRate: this.state.hourlyRate
		};
		try {
			await saveData(values).then(response => {
				if (response.message === "Entry saved") {
					this.entryHandler();
					setTimeout(
						function () {
							getTimeData().then(response => {
								this.setState({
									timeData: response
								});
							});
						}.bind(this),
						1000
					);
				} else {
					alert(response.message);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		let saveButton;

		const customerOptions = this.state.fetchedCustomers;
		const projectOptions = this.state.fetchedProjects;
		const taskOptions = this.state.fetchedActivities;

		if (this.state.entrySaved === false) {
			saveButton = (
				<>
					<Button onClick={this.saveTimeData.bind(this)}>Save</Button>
				</>
			);
		} else if (this.state.entrySaved === true) {
			saveButton = (
				<>
					<p>Your time was saved</p>
				</>
			);
		}

		let listEntries = this.renderTimeSheet();

		return (
			<>
				<Segment name="timetracking">
					<Header as="h1" textAlign="center">
						Time Tracking
				</Header>
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
										onChange={(e) => this.setState({ begin: e.target.value, entrySaved: false })}
										value={this.state.begin}
									/>
								</Table.Cell>
								<Table.Cell>
									<Input
										id='end'
										placeholder='YYYY-MM-DD HH:MM'
										onChange={(e) => this.setState({ end: e.target.value, entrySaved: false })}
										value={this.state.end}
									/>
								</Table.Cell>
								<Table.Cell>
									<Input
										id="hourlyRate"
										placeholder="$"
										onChange={e =>
											this.setState({
												hourlyRate: e.target.value,
												entrySaved: false
											})
										}
									/>
								</Table.Cell>
								<Table.Cell>
									<Dropdown
										id="customer"
										className="customer"
										selection
										defaultValue=""
										options={customerOptions}
										onChange={(e, { value }) => this.handleCustomerChange(value)}
									/>
								</Table.Cell>
								<Table.Cell>
									<Dropdown
										id="project"
										className="project"
										selection
										defaultValue=""
										options={projectOptions}
										onChange={(e, { value }) => this.handleProjectChange(value)}
									/>
								</Table.Cell>
								<Table.Cell>
									<Dropdown
										id="activity"
										className="activity"
										selection
										defaultValue=""
										options={taskOptions}
										onChange={(e, { value }) => this.handleActivityChange(value)}
									/>
								</Table.Cell>
								<Table.Cell>{saveButton}</Table.Cell>
							</Table.Row>
							{listEntries}
						</Table.Body>

						<Table.Footer>
							<Table.Row>
								<Table.HeaderCell textAlign="center" colSpan="7" />
							</Table.Row>
						</Table.Footer>
					</Table>
				</Segment>
			</>
		);
	}
}
