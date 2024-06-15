import { mount, flushPromises } from '@vue/test-utils';
import About from '@/components/About.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/todos', component: { template: '<div>TodoPage</div>' } },
  { path: '/', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

describe('About.vue', () => {
  beforeAll(async () => {
    router.push('/');
    await router.isReady();
  });

  it('renders About page', () => {
    const wrapper = mount(About, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.text()).toContain('Todo List by VueJS');
    expect(wrapper.text()).toContain('Was created by Andrii Zykov KV-32mp');
  });

  it('has a Back button', () => {
    const wrapper = mount(About, {
      global: {
        plugins: [router]
      }
    });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Back');
  });

  it('navigates to /todos on Back button click', async () => {
    const wrapper = mount(About, {
      global: {
        plugins: [router]
      }
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    await flushPromises();
    expect(wrapper.vm.$router.currentRoute.value.path).toBe('/todos');
  });
});
