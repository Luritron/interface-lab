<template>
  <div class="container">
    <h2>About</h2>
    <p>Todo List by VueJS</p>
    <p>Was created by Andrii Zykov KV-32mp</p>
    <router-link to="/todos">
      <button class="button">Back</button>
    </router-link>
  </div>
</template>
  
  <script>
  export default {
    name: 'AboutApp'
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

p {
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
  