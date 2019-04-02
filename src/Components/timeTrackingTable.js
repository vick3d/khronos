import React, { Component } from 'react';
import { Icon, Menu, Table, Input, Dropdown, Button } from 'semantic-ui-react'
import { saveData } from '../modules/timeData'

export class TimeTrackingTable extends Component  {
	constructor(props) {
    super(props)
  }

	async saveTimeData() {
		const values = {
			begin: this.props.begin,
  		end: this.props.end,
			customer: this.props.customer,
			project: this.props.project,
			activity: this.props.activity,
			description: this.props.description,
			fixedRate: this.props.fixedRate,
			hourlyRate: this.props.hourlyRate
		}
    try {
      await saveData(values);
    } catch(error) {
      console.log(error);
    }
	}

	render() {
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


		return(
			<Table celled>
				<Table.Header name="tableHeader">
					<Table.Row name="tableRow">
						<Table.HeaderCell>Start Time</Table.HeaderCell>
						<Table.HeaderCell>End Time</Table.HeaderCell>
						<Table.HeaderCell>Duration</Table.HeaderCell>
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
							<Input placeholder='YYYY-MM-DD HH:MM' />
						</Table.Cell>
						<Table.Cell>
							<Input placeholder='YYYY-MM-DD HH:MM' />
						</Table.Cell>
						<Table.Cell>

						</Table.Cell>
						<Table.Cell>
							<Input placeholder='$' />
						</Table.Cell>
						<Table.Cell>
							<Dropdown
								selection
								defaultValue=''
								options={customerOptions} />
						</Table.Cell>
						<Table.Cell>
						<Dropdown
								selection
								defaultValue=''
								options={projectOptions} />
						</Table.Cell>
						<Table.Cell>
						<Dropdown
								selection
								defaultValue=''
								options={taskOptions} />
						</Table.Cell>
						<Table.Cell>
							<Button onClick={this.saveTimeData.bind(this)}>
								Save
							</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell textAlign='center' colSpan='8'>
							<Menu pagination>
								<Menu.Item as='a' icon>
									<Icon name='chevron left' />
								</Menu.Item>
								<Menu.Item as='a'>1</Menu.Item>
								<Menu.Item as='a'>2</Menu.Item>
								<Menu.Item as='a'>3</Menu.Item>
								<Menu.Item as='a'>4</Menu.Item>
								<Menu.Item as='a' icon>
									<Icon name='chevron right' />
								</Menu.Item>
							</Menu>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		)
	}
}