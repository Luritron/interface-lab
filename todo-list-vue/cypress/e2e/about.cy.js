describe('About Page', () => {
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
      cy.visit('/about');
    });
  
    it('should display about page content', () => {
      cy.get('h2').should('contain', 'About');
      cy.get('p').should('contain', 'Todo List by VueJS');
      cy.get('p').should('contain', 'Was created by Andrii Zykov KV-32mp');
    });
  
    it('should have a Back button that navigates to /todos', () => {
      cy.get('button').contains('Back').click();
      cy.url().should('include', '/todos');
    });
  });
  