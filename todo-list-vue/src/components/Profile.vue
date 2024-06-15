<template>
  <div class="container">
    <h2>Profile</h2>
    <div class="profile-details">
      <p><strong>Username:</strong> {{ currentUser.username }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
      <p><strong>Birthdate:</strong> {{ currentUser.birthdate }}</p>
    </div>
    <router-link to="/todos">
      <button class="button">Back</button>
    </router-link>
  </div>
</template>
  
  <script>
  export default {
    name: 'UserProfile',
    computed: {
      currentUser() {
        return this.$store.getters.currentUser;
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

.profile-details {
  color: #333;
  font-size: 18px;
  margin: 10px 0;
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
</style>