import { createStore } from 'vuex';

const loadTodos = (userId) => {
  try {
    const todos = localStorage.getItem(`todos_${userId}`);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

const saveTodos = (userId, todos) => {
  try {
    localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Load user from localStorage if available
const user = JSON.parse(localStorage.getItem('user'));

const store = createStore({
  state: {
    todos: user ? loadTodos(user.id) : [],
    user: user || null,
    isAuthenticated: !!user
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
      if (state.user) {
        saveTodos(state.user.id, todos); 
      }
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
      if (state.user) {
        saveTodos(state.user.id, state.todos);
      }
    },
    UPDATE_TODO(state, { index, updatedTodo }) {
      state.todos[index] = updatedTodo;
      if (state.user) {
        saveTodos(state.user.id, state.todos);
      }
    },
    DELETE_TODO(state, index) {
      state.todos.splice(index, 1);
      if (state.user) {
        saveTodos(state.user.id, state.todos);
      }
    },
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
      state.todos = loadTodos(user.id);  // Load todos for this user
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.todos = [];  // Clear todos on logout
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    updateTodo({ commit }, payload) {
      commit('UPDATE_TODO', payload);
    },
    deleteTodo({ commit }, index) {
      commit('DELETE_TODO', index);
    },
    login({ commit }, user) {
      commit('SET_USER', user);
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  },
  getters: {
    allTodos: state => state.todos,
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user
  }
});

export default store;
