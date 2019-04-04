import React, { Component } from 'react';
import { Button, Container, Grid, Image, Divider } from 'semantic-ui-react'
import dummy from '../img/dummy_image.jpg'

class LandingPage extends Component {

	render() {
		let authorizedUser = this.props.authorizedUser
		let button

		if (authorizedUser){
			button =
				<Button basic color='green' name="button" onClick={() => alert('You are already logged in!')}>
					Get started here!
				</Button>
		} else {
			button =
				<Button basic color='green' name="button" onClick={ () => this.props.renderLoginForm()}>
					Get started here!
				</Button>
		}

    return (
			<>
				<Divider section />

				<Container textAlign='center' name="text">
					<h1>Are you a freelancer?</h1>
					<h3>Are you looking for solutions to keep track of your progress?</h3>
					<h3>Are you looking for an easy way to keep your projects organised?</h3>
					<h3>Are you looking for an easy platform for invoicing your customers?</h3>
					<h2>Then you are in the right place!</h2>
				</Container>

				<Divider hidden />

				<Container textAlign='center' >

				{button}

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