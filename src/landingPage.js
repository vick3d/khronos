import React, { Component } from 'react';


class LandingPage extends Component {
	render() {
    return (
			<>
				<section name="logo">
					<img src="./img/logo.png" alt="logo"/>
				</section>
				<section name="text">
					<p>Are you a freelancer?</p>
					<p>Are you looking for solutions to keep track of your progress?</p>
					<p>Are you looking for an easy way to keep your projects organised?</p>
					<p>Are you looking for an easy platform for invoicing your customers?</p>
					<p>Then you are in the write place!</p>
				</section>
				<button name="button">Get started here!</button>
				<section name="image">
					<img src="./img/dummy_image.jpg" alt="screenshot"/>
				</section>
				<section name="text">
					<p>
						Khronos is a web time-tracking application that..
					</p>
				</section>
			</>
		)}
}

export default LandingPage;