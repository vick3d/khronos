import React, { Component } from 'react'
import { getTimeData } from '../modules/kimaiGetTimeData'
import { getData } from "../modules/kimaiGetCustomerData";
import { getProjectData } from "../modules/kimaiGetProjectData";
import { getProjectActivities } from "../modules/kimaiGetProjectActivities";
import { Button, Table, Form, Container, Header, Radio } from 'semantic-ui-react'
import moment from "moment-timezone";



class Invoicing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			begin: "",
			end: "",
			customer: {},
			customerName: "",
			project: "",
			activity: "",
			description: "",
			fixedRate: "",
			hourlyRate: "",
			fetchedCustomers: [],
			timeData: [],
			fetchedCustomerProjects: [],
			fetchedAllProjects: [],
			fetchedActivities: [],
			fetchedAllActivities: [],
			invoiceLines: [],
			aggregatedDuration: "",
			aggregatedEarnings: "",
			renderInvoice: false,
			invoiceMessage: ''
		}
	}

	componentDidMount() {
		this.updateAllData();
	}

	hello(e) {
		debugger;
	}
	invoiceToggle(entry) {
		const timeData = this.state.timeData;
		const entryIndex = timeData.findIndex(savedEntry => savedEntry.id == entry.currentTarget.parentElement.parentElement.id)
		const item = timeData[entryIndex]
		let invoiceLines = this.state.invoiceLines
		if(invoiceLines.includes(item)) {
			const itemIndex = invoiceLines.findIndex(savedEntry => savedEntry.id === item.id)
			invoiceLines.splice(itemIndex, 1)
		} else {
			invoiceLines.push(item)
		}

		let duration;
		let earnings;

		if(invoiceLines.length === 0) {
			duration = 0
			earnings = 0

		} else {
			duration = invoiceLines.reduce((acc, currV) => {
					return acc + currV.duration;
			}, 0);
			earnings = invoiceLines.reduce((acc, currV) => {
				return acc + currV.rate;
		}, 0);
		}

		let rawTime = moment.duration(duration*1000)
		let hours = rawTime.hours();
		let minutes = rawTime.minutes();
		let humanizedTime = '' + hours + ' hours ' + minutes + ' minutes.'

		this.setState({aggregatedDuration: humanizedTime})
		this.setState({aggregatedEarnings: Math.floor(earnings)})
		this.setState({invoiceLines: invoiceLines})
	}

	createInvoice() {
		this.setState({renderInvoice: true})
	}

	invoiceHandler() {
		this.setState({renderInvoice: false, invoiceLines: [], aggregatedDuration: '', aggregatedEarnings: '', invoiceMessage: ''})
	}

	handleCustomerChange(value) {
		this.setState({ customer: value, project: null, activity: null });
		this.getCustomerProjects(value);
		this.getActivities();
	}

	handleProjectChange(value) {
		this.setState({ project: value, activity: null });
		this.getActivities(value);
	}

	handleActivityChange(value) {
		this.setState({ activity: value });
	}

	async updateAllData(value) {
		await this.getCustomerData(value);
		await this.getAllProjects(value);
		await this.getAllActivities(value);
		await getTimeData().then(
			response => {
			 this.updateTimeData(response);
			},
			reason => {
				console.log("something went wrong");
			}
		);
	}

	updateTimeData(timeData) {
		let projects = this.state.fetchedAllProjects;
		let customers = this.state.fetchedCustomers;
		let activities = this.state.fetchedAllActivities;
		let newTimeData = timeData.filter(timeSheet => {
			let pId = timeSheet.project;
			let pIndex = projects.findIndex(project => project.value == pId);
			timeSheet.project = projects[pIndex].text;
			timeSheet.projectId = projects[pIndex].value
			let cId = projects[pIndex].customer;
			let cIndex = customers.findIndex(customer => customer.value == cId);
			timeSheet.customer = customers[cIndex].text;
			timeSheet.customerId = customers[cIndex].value
			let aId = timeSheet.activity;
			let aIndex = activities.findIndex(activity => activity.value == aId);
			timeSheet.activity = activities[aIndex].text;
			timeSheet.activityId = activities[aIndex].value;
			return timeSheet;
		});
		this.setState({
			timeData: newTimeData
		});
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
							rCompany["visible"] = company.visible;
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

	async getAllProjects() {
		try {
			await getProjectData("all").then(response => {
				if (response.message === "Could not fetch project data at this time.") {
					alert(response.message);
				} else {
					{
						let responseArray = response.data;
						let projectsArray = responseArray.map(project => {
							let rProject = {};
							rProject["text"] = project.name;
							rProject["value"] = project.id;
							rProject["customer"] = project.customer;
							rProject["visible"] = project.visible;
							return rProject;
						});
						this.setState({ fetchedAllProjects: projectsArray });
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async getAllActivities() {
		try {
			await getProjectActivities("all").then(response => {
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
							rActivity["visible"] = activity.visible;
							if (activity.project) {
								rActivity["project"] = activity.project;
							} else {
								rActivity["project"] = null;
							}
							return rActivity;
						});
						this.setState({ fetchedAllActivities: activitiesArray });
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async getCustomerProjects(value) {
		const customerId = value;
		let customerProjects = this.state.fetchedAllProjects.filter(
			project => project.customer == customerId && project.visible
		);

		let projectsArray = customerProjects.map(project => {
			let rProject = {};
			rProject["text"] = project.text;
			rProject["value"] = project.value;
			return rProject;
		});
		this.setState({ fetchedCustomerProjects: projectsArray });
	}

	async getActivities(value) {
		const projectId = value;
		let projectActivities = this.state.fetchedAllActivities.filter(
			activity => activity.project === projectId && activity.visible
		);
		let activitiesArray = projectActivities.map(activity => {
			let rActivity = {};
			rActivity["text"] = activity.text;
			rActivity["value"] = activity.value;
			return rActivity;
		});
		this.setState({ fetchedActivities: activitiesArray });
	}



	renderTimeSheet(customer, project , activity) {
		const timeData = this.state.timeData;
		let customerData;
		if(customer && !project && !activity) {
			customerData = timeData.filter(entry => entry.customerId === customer);
		} else if (customer && project && !activity) {
			customerData = timeData.filter(entry => entry.customerId === customer && entry.projectId === project);
		} else if (customer && project && activity) {
			customerData = timeData.filter(entry => entry.customerId === customer && entry.projectId === project && entry.activityId === activity);
		}
		return customerData.map(entry => {
			return (
				<Table.Row id={entry.id}>
					<Table.Cell id="beginSave">
						{moment(entry.begin)
							.tz("Europe/Stockholm")
							.format("YYYY-MM-DD HH:mm")}
					</Table.Cell>
					<Table.Cell id="endSave">
						{moment(entry.end)
							.tz("Europe/Stockholm")
							.format("YYYY-MM-DD HH:mm")}
					</Table.Cell>
					<Table.Cell>{entry.rate}</Table.Cell>
					<Table.Cell>{entry.customer}</Table.Cell>
					<Table.Cell>{entry.project}</Table.Cell>
					<Table.Cell>{entry.activity}</Table.Cell>
					<Table.Cell><Radio toggle className="toggle" onChange={this.invoiceToggle.bind(this)}/></Table.Cell>
				</Table.Row>
			);
		});
	}




  render() {
		const aggregatedDuration = this.state.aggregatedDuration;
		const aggregatedEarnings = this.state.aggregatedEarnings;
		const invoiceMessage = this.state.invoiceMessage;
		const customerOptions = this.state.fetchedCustomers;
		const projectOptions = this.state.fetchedCustomerProjects;
		const taskOptions = this.state.fetchedActivities;

		let render;
		let timeSheet = this.renderTimeSheet(this.state.customer, this.state.project, this.state.activity);

			if (this.state.renderInvoice) {
				render = (
					<>
					<Container textAlign="left">
					<Button inverted color='green' onClick={this.invoiceHandler.bind(this)}>Back</Button>
					</Container>
					<div className="invoice-box">
					<table cellpadding="0" cellspacing="0">
							<tr className="top">
									<td colspan="2">
											<table>
													<tr>
															<td className="title">
															</td>
															<td>
																	Invoice #: 123<br></br>
																	Created: April 13, 2019<br></br>
																	Due: April 23, 2019<br></br>
															</td>
													</tr>
											</table>
									</td>
							</tr>

							<tr className="information">
									<td colspan="2">
											<table>
													<tr>
															<td>
																	Khronos Inc.<br></br>
																	Open Labs<br></br>
																	11428 STOCKHOLM<br></br>
															</td>

															<td>
																	Customer<br></br>
																	John Doe<br></br>
																	john@example.com<br></br>
															</td>
													</tr>
											</table>
									</td>
							</tr>
							<tr className="heading">
									<td>
											Payment Method
									</td>
									<td>
											BankGiro #
									</td>
							</tr>
							<tr className="details">
									<td>
										BankGiro
									</td>
									<td>
											1337-1337
									</td>
							</tr>
							<tr className="heading">
									<td>
											Total Working Hours
									</td>
									<td>
											Price
									</td>
							</tr>
							<tr className="item">
									<td>
										 <p> {aggregatedDuration}</p>
									</td>
									<td>
											 {aggregatedEarnings}
									</td>
							</tr>

							<tr className="total">
									<td>{invoiceMessage}</td>
									<td>
										 Total: ${aggregatedEarnings}
									</td>
							</tr>
					</table>
			</div>
			</>
		)} else {
			render = (
				<>
				<Container>
					<Form>
						<Form.Group widths='equal'>
							<Form.Select
								fluid
								label='Customer'
								className="customer"
								options={customerOptions}
								placeholder='Customer name'
								onChange={(e, { value }) => this.handleCustomerChange(value)}
								/>
							<Form.Select
								fluid
								label='Project'
								className="project"
								options={projectOptions}
								placeholder='Project name'
								onChange={(e, { value }) => this.handleProjectChange(value)}
							/>
							<Form.Select
								fluid
								label='Task'
								className="task"
								options={taskOptions}
								placeholder='Task name'
								onChange={(e, { value }) => this.handleActivityChange( value)}
							/>
						</Form.Group>
						<Form.Group widths='equal'>
							<Form.Field><label>Duration</label><p>{aggregatedDuration}</p></Form.Field>
							<Form.Field><label>Total Earnings</label><p>{aggregatedEarnings}</p></Form.Field>
						</Form.Group>
						<Form.TextArea
							label='Free text'
							placeholder='If you need to have some free text write it here'
							onChange={e => this.setState({invoiceMessage: e.currentTarget.value})}
							/>
						<Form.Button inverted color='green' name="create_invoice" onClick={this.createInvoice.bind(this)}>Create Invoice</Form.Button>
					</Form>
				</Container>
				<Container>
				<Table celled textAlign="center">
				 	<Table.Header>
					 <Table.Row name="tableRow">
							<Table.HeaderCell>Start Time</Table.HeaderCell>
							<Table.HeaderCell>End Time</Table.HeaderCell>
							<Table.HeaderCell>Earnings</Table.HeaderCell>
							<Table.HeaderCell>Customer</Table.HeaderCell>
							<Table.HeaderCell>Project</Table.HeaderCell>
							<Table.HeaderCell>Task</Table.HeaderCell>
							<Table.HeaderCell>Invoice</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{timeSheet}
					</Table.Body>
				</Table>
				</Container>
			</>
			)}

    return (
			<>
			<Container>
			<Header as="h1" textAlign="center"  name="header">
				Invoicing
			</Header>
			</Container>
			{render}
			</>
		)
  }
}

export default Invoicing