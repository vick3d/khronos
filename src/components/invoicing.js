import React, { Component } from 'react'
import { getTimeData } from '../modules/kimaiGetTimeData'
import { getData } from "../modules/kimaiGetCustomerData";
import { getProjectData } from "../modules/kimaiGetProjectData";
import { getProjectActivities } from "../modules/kimaiGetProjectActivities";
import { Table, Form, Container, Header, Radio } from 'semantic-ui-react'
import moment from "moment-timezone";
import { ENETUNREACH } from 'constants';



class Invoicing extends Component {
  state = {
		begin: "",
		end: "",
		customer: {},
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
	}

	componentDidMount() {
		this.updateAllData();
	}

	handleCustomerChange(value) {
		this.setState({ customer: value });
		this.setState({ project: null})
		this.setState({	activity: null})
		this.getCustomerProjects(value);
		this.getActivities();
	}

	handleProjectChange(value) {
		this.setState({ project: value });
		this.setState({ activity: null})
		this.getActivities(value);
	}

	handleActivityChange(value) {
		this.setState({ activity: value });
	}

	async updateAllData(value) {
		debugger;
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
				<Table.Row>
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
					<Table.Cell><Radio toggle/></Table.Cell>
				</Table.Row>
			);
		});
	}

  render() {
		const customerOptions = this.state.fetchedCustomers;
		const projectOptions = this.state.fetchedCustomerProjects;
		const taskOptions = this.state.fetchedActivities;
		let timeSheet = this.renderTimeSheet(this.state.customer, this.state.project, this.state.activity);
    return (
			<>
				<Container>
				<Header as="h1" textAlign="center"  name="header">
					Invoicing
				</Header>
				</Container>
				<Container>
					<Form>
						<Form.Group widths='equal'>
							<Form.Select
								fluid
								label='Customer'
								options={customerOptions}
								placeholder='Customer name'
								onChange={(e, { value }) => this.handleCustomerChange(value)}
								/>
							<Form.Select
								fluid
								label='Project'
								options={projectOptions}
								placeholder='Project name'
								onChange={(e, { value }) => this.handleProjectChange(value)}
							/>
							<Form.Select
								fluid
								label='Task'
								options={taskOptions}
								placeholder='Task name'
								onChange={(e, { value }) => this.handleActivityChange(value)}
							/>
						</Form.Group>
						<Form.Group widths='equal'>
							<Form.Input fluid label='Duration' placeholder='Duration' />
							<Form.Input fluid label='Rate' placeholder='Rate' />
							<Form.Field textAligned="right" fluid label='Total' value="Total amount"/>
						</Form.Group>
						<Form.TextArea label='Free text' placeholder='If you need to have some free text write it here' />
						<Form.Button inverted color='green'>Create Invoice</Form.Button>
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
		)
  }
}

export default Invoicing