import React from 'react'
import { Icon, Menu, Table, Input } from 'semantic-ui-react'

export const TimeTrackingTable = () => {
	return(
		<Table celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Date</Table.HeaderCell>
					<Table.HeaderCell>Start</Table.HeaderCell>
					<Table.HeaderCell>End</Table.HeaderCell>
					<Table.HeaderCell>Duration</Table.HeaderCell>
					<Table.HeaderCell>Rate</Table.HeaderCell>
					<Table.HeaderCell>Customer</Table.HeaderCell>
					<Table.HeaderCell>Project</Table.HeaderCell>
					<Table.HeaderCell>Task</Table.HeaderCell>

				</Table.Row>
			</Table.Header>

			<Table.Body>
				<Table.Row>
					<Table.Cell>
						<Input placeholder='D' />
					</Table.Cell>
					<Table.Cell>
						<Input placeholder='D' />
					</Table.Cell>
					<Table.Cell>
						<Input placeholder='D' />
					</Table.Cell>
					<Table.Cell>
						<Input placeholder='D' />
					</Table.Cell>
					<Table.Cell>
						<Input placeholder='D' />
					</Table.Cell>
					<Table.Cell>
						<Input placeholder='D' />
					</Table.Cell>
					<Table.Cell>
						<Input placeholder='D' />
					</Table.Cell>
					<Table.Cell>
						<Input placeholder='D' />
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