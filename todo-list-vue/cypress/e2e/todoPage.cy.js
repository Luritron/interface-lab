describe('Todo Page', () => {
    beforeEach(() => {
      const user = {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        birthdate: '2000-01-01',
        password: 'password123'
      };
      localStorage.setItem('users', JSON.stringify([user]));
      cy.visit('/login');
      cy.get('input[placeholder="Username"]').type('testuser');
      cy.get('input[placeholder="Password"]').type('password123');
      cy.get('button').contains('Login').click();
  
      cy.url().should('include', '/todos');
    });
  
    it('should display todo page', () => {
      cy.get('.logo').should('exist');
      cy.get('button').contains('Profile').should('exist');
      cy.get('button').contains('About').should('exist');
      cy.get('button').contains('Logout').should('exist');
    });
  
    it('should navigate to profile page', () => {
      cy.get('button').contains('Profile').click();
      cy.url().should('include', '/profile');
    });
  
    it('should navigate to about page', () => {
      cy.get('button').contains('About').click();
      cy.url().should('include', '/about');
    });
  
    it('should logout and navigate to login page', () => {
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
    });
  });
  