<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="Vue Logo" class="logo">
    <div class="button-group">
      <router-link to="/profile">
        <button class="button">Profile</button>
      </router-link>
      <router-link to="/about">
        <button class="button">About</button>
      </router-link>
      <button @click="logout" class="button">Logout</button>
    </div>
    <AddTodo />
    <TodoList />
  </div>
</template>
  
  <script>
  import AddTodo from './AddTodo.vue';
  import TodoList from './TodoList.vue';
  
  export default {
    name: 'TodoPage',
    components: {
      AddTodo,
      TodoList
    },
    computed: {
      todos() {
        return this.$store.getters.allTodos;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      }
    },
    created() {
      if (!this.$store.getters.isAuthenticated) {
        this.$router.push('/login');
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
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.button-group {
  margin-bottom: 20px;
}

.button-group .button {
  margin-right: 10px;
}

.button-group .button:last-child {
  margin-right: 10px;
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
}

.button:hover {
  background-color: #45a049; 
}

input[type="text"], input[type="email"], input[type="password"], input[type="date"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, input[type="date"]:focus {
  border: 1px solid #4CAF50; 
}

input[type="text"]::placeholder, input[type="email"]::placeholder, input[type="password"]::placeholder, input[type="date"]::placeholder {
  color: #ccc;
}
</style>