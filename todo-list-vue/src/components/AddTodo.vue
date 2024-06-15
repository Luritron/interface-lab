<template>
  <div class="add-todo-container">
    <input type="text" v-model="newTodo" placeholder="Enter new todo" class="input">
    <button @click="addTodo" class="button">Add Todo</button>
  </div>
</template>
  
  <script>
  export default {
    name: 'AddTodo',
    data() {
      return {
        newTodo: ''
      };
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() === '') return;
        this.$store.dispatch('addTodo', this.newTodo);
        this.newTodo = '';
      }
    }
  };
  </script>
  
  <style scoped>
.add-todo-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input {
  flex: 1;
  padding: 12px 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.input:focus {
  border-color: #4CAF50; 
}

.button {
  background-color: #4CAF50; 
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049; 
}
</style>