describe('Thank you page', () => {
	before(() => {
		cy.visit('http://localhost:3000/order?id="123123123"');
	});

	it('Has error message', () => {
		cy.get('p').should('contain', `Order not found or it's id is invalid`);
	});
});
