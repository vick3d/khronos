import React, { Component } from 'react';
import logo from '../img/image.png'
import { Image, Icon, Menu, Divider, Message } from 'semantic-ui-react'

class Navbar extends Component {
	start = () => {
		localStorage.setItem('startedActivity', new Date().toISOString())
	}

	stop = () => {
		const begin = localStorage.getItem('startedActivity')
		const end = new Date().toISOString()
		this.props.onStop({begin: begin, end: end})
	}

	render() {
		if (this.props.isLoggedIn) {
			return (
				<Menu>
					<Menu.Item link name='logo'>
						<Image src={logo} id='logo' size='small' />
					</Menu.Item>
					<Menu.Item >
						<Icon link inverted color='white' name='sign-out' size='big' />
					</Menu.Item>
					<Menu.Item >
						<Icon link inverted color='white' name='play' size='big' onClick={() => this.start()} />
					</Menu.Item>
					<Menu.Item >
						<Icon link inverted color='white' name='stop' size='big' onClick={() => this.stop()}/>
					</Menu.Item>
					<Message background='green' size='big'>{this.props.message}</Message>
					<Menu.Item position='right'>
						<Icon link inverted color='white' name='help' size='big' />
						<Divider vertical />
						<Icon link inverted color='white' name='calendar alternate outline' size='big' />
					</Menu.Item>
				</Menu>)
		} else {
			return (
				<Menu>
					<Menu.Item link name='logo'>
						<Image src={logo} id='logo' size='small' />
					</Menu.Item>
					<Menu.Item >
						<Icon link inverted color='white' name='sign-in' size='big' onClick={ () => this.props.renderLoginForm()} />
					</Menu.Item>
					<Menu.Item position='right'>
						<Icon link inverted color='white' name='help' size='big' />
					</Menu.Item>
				</Menu>
			)
		}
	}
}

export default Navbar;