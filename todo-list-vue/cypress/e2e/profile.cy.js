describe('Profile Page', () => {
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
      cy.visit('/profile');
    });
  
    it('should display profile details', () => {
      cy.get('h2').should('contain', 'Profile');
      cy.get('.profile-details').should('contain', 'Username: testuser');
      cy.get('.profile-details').should('contain', 'Email: testuser@example.com');
      cy.get('.profile-details').should('contain', 'Birthdate: 2000-01-01');
    });
  
    it('should have a Back button that navigates to /todos', () => {
      cy.get('button').contains('Back').click();
      cy.url().should('include', '/todos');
    });
  });
  