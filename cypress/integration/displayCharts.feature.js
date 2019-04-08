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
  .get('button').contains('Charts').click()
  .get('div[id="chart"]').contains('chart')
  })
})