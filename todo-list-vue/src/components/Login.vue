<template>
  <div class="container">
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="Username" class="input-field" />
    <input type="password" v-model="password" placeholder="Password" class="input-field" />
    <button @click="login" class="button">Login</button>
    <router-link to="/register" class="register-link">No account? <strong>Register</strong></router-link>
  </div>
</template>
  
  <script>
export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === this.username && u.password === this.password);
      
      if (user) {
        this.$store.dispatch('login', user);
        this.$router.push('/todos');
      } else {
        alert('Invalid username or password.');
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

.register-link {
  margin-top: 20px;
  color: #000000; 
  text-decoration: none;
}

.register-link strong {
  text-decoration: underline;
}

.register-link:hover {
  color: #45a049; 
}
</style>