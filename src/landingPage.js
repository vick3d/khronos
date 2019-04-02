import React, { Component } from 'react';
import { Button, Container, Grid, Image, Divider } from 'semantic-ui-react'
import dummy from './img/dummy_image.jpg'

class LandingPage extends Component {
	render() {
    return (
			<>
				<Divider section />

				<Container textAlign='center' name="text">
					<h1>Are you a freelancer?</h1>
					<h3>Are you looking for solutions to keep track of your progress?</h3>
					<h3>Are you looking for an easy way to keep your projects organised?</h3>
					<h3>Are you looking for an easy platform for invoicing your customers?</h3>
					<h2>Then you are in the write place!</h2>
				</Container>

				<Divider hidden />

				<Container textAlign='center' >
					<Button basic color='green' name="button">
  			    Get started here!
  			  </Button>
				</Container>

				<Divider section />

				<Container name="images">
					<Grid>
						<Grid.Row centered columns={3}>
							<Grid.Column>
								<Image src={dummy} />
							</Grid.Column>
							<Grid.Column>
								<Image src={dummy} />
							</Grid.Column>
							<Grid.Column>
								<Image src={dummy} />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>

				<Divider hidden />
			</>
		)}
}

export default LandingPage;