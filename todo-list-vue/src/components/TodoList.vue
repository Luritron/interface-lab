<template>
  <div class="todo-list-container">
    <div v-for="(todo, index) in todos" :key="index" class="todo-item">
      <span class="todo-text">{{ todo }}</span>
      <button @click="editTodo(index)" class="button edit-button">Edit</button>
      <button @click="deleteTodo(index)" class="button delete-button">Delete</button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'TodoList',
    computed: {
      todos() {
        return this.$store.getters.allTodos;
      }
    },
    methods: {
      editTodo(index) {
        const updatedTodo = prompt('Update todo:', this.todos[index]);
        if (updatedTodo !== null) {
          this.$store.dispatch('updateTodo', { index, updatedTodo });
        }
      },
      deleteTodo(index) {
        this.$store.dispatch('deleteTodo', index);
      }
    }
  };
  </script>
  
  <style scoped>
.todo-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #f9f9f9;
  padding: 10px;
  margin: 1px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-text {
  flex: 1;
  margin-right: 10px;
}

.button {
  background-color: #4CAF50; 
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049; 
}

.edit-button {
  margin-right: 5px;
}

.delete-button {
  background-color: #f44336; 
}

.delete-button:hover {
  background-color: #d32f2f; 
}
</style>