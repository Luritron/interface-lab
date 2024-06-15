import { mount, flushPromises } from '@vue/test-utils';
import Profile from '@/components/Profile.vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/todos', component: { template: '<div>TodoPage</div>' } },
  { path: '/', component: Profile }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

describe('Profile.vue', () => {
  let store;

  beforeEach(async () => {
    store = createStore({
      getters: {
        currentUser: () => ({
          username: 'testuser',
          email: 'testuser@example.com',
          birthdate: '2000-01-01'
        })
      }
    });

    router.push('/');
    await router.isReady();
  });

  it('renders Profile page with user data', () => {
    const wrapper = mount(Profile, {
      global: {
        plugins: [store, router]
      }
    });
    expect(wrapper.text()).toContain('Username: testuser');
    expect(wrapper.text()).toContain('Email: testuser@example.com');
    expect(wrapper.text()).toContain('Birthdate: 2000-01-01');
  });

  it('has a Back button', () => {
    const wrapper = mount(Profile, {
      global: {
        plugins: [store, router]
      }
    });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Back');
  });

  it('navigates to /todos on Back button click', async () => {
    const wrapper = mount(Profile, {
      global: {
        plugins: [store, router]
      }
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    await flushPromises();
    expect(wrapper.vm.$router.currentRoute.value.path).toBe('/todos');
  });
});
