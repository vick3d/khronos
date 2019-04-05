import React, { Component } from 'react';
import { Segment, Container, List, Divider } from 'semantic-ui-react'

class Footer extends Component {
	render() {
		return (
			<>
				<Segment name="footer" vertical>
					<Container textAlign='center'>
						<Divider hidden />
						<List horizontal divided link size='medium'>
							<List.Item as='a' href='#'>
								Contact Us
              </List.Item>
							<List.Item as='a' href='#'>
								Terms and Conditions
              </List.Item>
							<List.Item as='a' href='#'>
								Privacy Policy
              </List.Item>
						</List>
						<Divider hidden />
					</Container >
				</Segment >
			</>
		)
	}
}

export default Footer;