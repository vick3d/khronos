describe('Display charts', () => {
	beforeEach(function () {
		cy
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains('Login').click()
	})

	it('User can see saved times', () => {
		cy
			.get('.three > :nth-child(2) > .white').click()
			.get('.info-box-number-l').contains('Working Hours (Today)')
			.get('.info-box-number-r').contains('Revenue (Today)')
			.get(':nth-child(1) > .chartjs-render-monitor')
			.get(':nth-child(2) > .chartjs-render-monitor')
	})
})