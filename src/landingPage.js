import React, { Component } from 'react';
import { Button, Container, Grid, Image, Divider } from 'semantic-ui-react'
import dummy from './img/dummy_image.jpg'
import Navbar from './components/navbar'

class LandingPage extends Component {
	render() {
    return (
			<>
				<Navbar />
				<Divider section />

				<Container textAlign='center' name="text">
					<p>Are you a freelancer?</p>
					<p>Are you looking for solutions to keep track of your progress?</p>
					<p>Are you looking for an easy way to keep your projects organised?</p>
					<p>Are you looking for an easy platform for invoicing your customers?</p>
					<p>Then you are in the write place!</p>
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