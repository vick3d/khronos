import React from 'react'
import { Icon, Menu, Table, Input, Dropdown, Button } from 'semantic-ui-react'

export const TimeTrackingTable = () => {
	const customerOptions = [
		{ text: "Company 1", value: "company_1" },
		{ text: "Company 2", value: "company_2" },
		{ text: "Company 3", value: "company_3" },
		{ text: "Company 4", value: "company_4" }
	]
	const projectOptions = [
		{ text: "Project 1", value: "project_1" },
		{ text: "Project 2", value: "project_2" },
		{ text: "Project 3", value: "project_3" },
		{ text: "Project 4", value: "project_4" }
	]
	const taskOptions = [
		{ text: "Task 1", value: "task_1" },
		{ text: "Task 2", value: "task_2" },
		{ text: "Task 3", value: "task_3" },
		{ text: "Task 4", value: "task_4" }
	]

	return(
		<Table celled>
			<Table.Header>
				<Table.Row>
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
						<Button>
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

export default TimeTrackingTable