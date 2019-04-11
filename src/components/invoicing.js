import React, { Component } from 'react'
import { getData } from '../modules/kimaiGetCustomerData'
import { getProjectData } from "../modules/kimaiGetProjectData";
import { getProjectActivities } from "../modules/kimaiGetProjectActivities";
import { Form, Container, Header } from 'semantic-ui-react'



class Invoicing extends Component {
  state = {
		customer: '',
		project: '',
		activity: '',
		fetchedCustomers: [],
		fetchedProjects: [],
		fetchedActivities: []
	}

	componentDidMount() {
		this.getCustomerData();
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

  render() {
		const customerOptions = this.state.fetchedCustomers;
		const projectOptions = this.state.fetchedProjects;
		const taskOptions = this.state.fetchedActivities;
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
			</>
		)
  }
}

export default Invoicing