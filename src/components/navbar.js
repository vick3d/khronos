import React, { Component } from 'react';
import logo from '../img/image.png'
import { Image, Icon, Menu, Divider, Message } from 'semantic-ui-react'
import moment from "moment-timezone"

class Navbar extends Component {
	start = () => {
		const begin = moment().tz("Europe/Stockholm").format('YYYY-MM-DD HH:mm')
		localStorage.setItem('begin', begin)
		alert("Started recording")
	}

	stop = () => {
		const begin = localStorage.getItem('begin')
		const end = moment().tz("Europe/Stockholm").format('YYYY-MM-DD HH:mm')
		this.props.onStop({begin: begin, end: end})
		alert("Stopped recording.\nPlease add work details before submission.")
	}

	render() {
		if (this.props.isLoggedIn) {
			return (
				<Menu>
					<Menu.Item link name='logo' onClick={ () => this.props.dashboard()} >
						<Image src={logo} id='logo' size='small' />
					</Menu.Item>
					<Menu.Item >
						<Icon link inverted color='white' name='sign-out' size='big' />
					</Menu.Item>
					<Menu.Item >
						<Icon link inverted color='white' name='play' id='play' size='big' onClick={() => this.start()} />
					</Menu.Item>
					<Menu.Item >
						<Icon link inverted color='white' name='stop' id='stop' size='big' onClick={() => this.stop()}/>
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