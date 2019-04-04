import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

const LoginForm = (props) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='login-form'>
			<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='black' textAlign='center'>
						Log-in to your account
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

							<Button color='green' fluid size='large' onClick={ () => props.onLogin(userName, password) }>
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