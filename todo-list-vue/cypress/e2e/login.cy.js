describe('Login Page', () => {
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
    });
  
    it('should display login form', () => {
      cy.get('h2').should('contain', 'Login');
      cy.get('input[placeholder="Username"]').should('exist');
      cy.get('input[placeholder="Password"]').should('exist');
      cy.get('button').should('contain', 'Login');
    });
  
    it('should login with valid credentials', () => {
      cy.get('input[placeholder="Username"]').type('testuser');
      cy.get('input[placeholder="Password"]').type('password123');
      cy.get('button').contains('Login').click();
  
      cy.url().should('include', '/todos');
    });
  
    it('should show an alert with invalid credentials', () => {
      cy.get('input[placeholder="Username"]').type('wronguser');
      cy.get('input[placeholder="Password"]').type('wrongpassword');
      cy.get('button').contains('Login').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Invalid username or password.');
      });
    });
  });
  