import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import TodoPage from '@/components/TodoPage.vue';
import AddTodo from '@/components/AddTodo.vue';
import TodoList from '@/components/TodoList.vue';

describe('TodoPage.vue', () => {
  let actions;
  let getters;
  let store;
  let router;

  beforeEach(() => {
    actions = {
      logout: jest.fn(),
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodo: jest.fn(),
    };

    getters = {
      isAuthenticated: () => true,
      allTodos: () => ['Test Todo 1', 'Test Todo 2'],
    };

    store = new Vuex.Store({
      actions,
      getters,
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });
  });

  it('should render the component properly', () => {
    const wrapper = shallowMount(TodoPage, {
      global: {
        plugins: [store, router],
        stubs: {
          'router-link': true,
        },
      },
    });

    expect(wrapper.findComponent(AddTodo).exists()).toBe(true);
    expect(wrapper.findComponent(TodoList).exists()).toBe(true);
  });

  it('should redirect to login if not authenticated', () => {
    getters.isAuthenticated = () => false;
    store = new Vuex.Store({
      actions,
      getters,
    });

    const push = jest.fn();
    router.push = push;

    shallowMount(TodoPage, {
      global: {
        plugins: [store, router],
        stubs: {
          'router-link': true,
        },
      },
    });

    expect(push).toHaveBeenCalledWith('/login');
  });

  it('should call logout action and redirect to login on logout button click', async () => {
    const push = jest.fn();
    router.push = push;
    const wrapper = shallowMount(TodoPage, {
      global: {
        plugins: [store, router],
        stubs: {
          'router-link': true,
        },
      },
    });

    await wrapper.find('button.button').trigger('click');

    expect(actions.logout).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/login');
  });
});