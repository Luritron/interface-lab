describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('/register');
    });
  
    it('should display registration form', () => {
      cy.get('h2').should('contain', 'Register');
      cy.get('input[placeholder="Username"]').should('exist');
      cy.get('input[placeholder="Email"]').should('exist');
      cy.get('input[placeholder="Birthdate"]').should('exist');
      cy.get('input[placeholder="Password"]').should('exist');
      cy.get('button').should('contain', 'Register');
    });
  
    it('should register a new user', () => {
      cy.get('input[placeholder="Username"]').type('testuser');
      cy.get('input[placeholder="Email"]').type('testuser@example.com');
      cy.get('input[placeholder="Birthdate"]').type('2000-01-01');
      cy.get('input[placeholder="Password"]').type('password123');
      cy.get('button').contains('Register').click();
  
      cy.url().should('include', '/login');
      cy.window().then((win) => {
        const users = JSON.parse(win.localStorage.getItem('users'));
        expect(users).to.have.length(1);
        expect(users[0].username).to.equal('testuser');
      });
    });
  
    it('should show an alert if fields are empty', () => {
      cy.get('button').contains('Register').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Please fill in all fields.');
      });
    });
  });
  