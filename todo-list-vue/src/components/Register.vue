<template>
  <div class="container">
    <h2>Register</h2>
    <input type="text" v-model="username" placeholder="Username" class="input-field" />
    <input type="email" v-model="email" placeholder="Email" class="input-field" />
    <input type="date" v-model="birthdate" placeholder="Birthdate" class="input-field" />
    <input type="password" v-model="password" placeholder="Password" class="input-field" />
    <button @click="register" class="button">Register</button>
    <router-link to="/login" class="login-link">Have account? <strong>Login</strong></router-link>
  </div>
</template>
  
  <script>
export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      email: '',
      birthdate: '',
      password: ''
    };
  },
  methods: {
    register() {
      if (this.username && this.email && this.birthdate && this.password) {
        const user = {
          id: new Date().getTime(),  // generating uniq index
          username: this.username,
          email: this.email,
          birthdate: this.birthdate,
          password: this.password
        };
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        users.push(user);
        
        localStorage.setItem('users', JSON.stringify(users));
        
        this.$router.push('/login');
      } else {
        alert('Please fill in all fields.');
      }
    }
  }
};
</script>

  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h2 {
  color: #000000; 
  margin-bottom: 20px;
}

.input-field {
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-field:focus {
  border: 1px solid #4CAF50; 
}

.button {
  background-color: #4CAF50; 
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.button:hover {
  background-color: #45a049; 
}

.login-link {
  margin-top: 20px;
  color: #000000; 
  text-decoration: none;
}

.login-link strong {
  text-decoration: underline;
}

.login-link:hover {
  color: #45a049; 
}
</style>