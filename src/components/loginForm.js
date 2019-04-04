import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

const LoginForm = (props) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='login-form'>
			{/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
			<style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
			</style>
			<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='teal' textAlign='center'>
						<Image src='/logo.png' /> Log-in to your account
        </Header>
					<Form size='large' >
						<Segment stacked>
							<Form.Input value={userName} onInput={e => setUserName(e.target.value)} fluid icon='user' iconPosition='left' placeholder='Username' />
							<Form.Input
								value={password} onInput={e => setPassword(e.target.value)}
								fluid icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
							/>

							<Button color='teal' fluid size='large' onClick={ () => props.onLogin(userName, password) }>
								Login
            	</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	)
}

export default LoginForm