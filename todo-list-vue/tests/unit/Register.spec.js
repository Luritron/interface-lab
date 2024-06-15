import { shallowMount } from '@vue/test-utils';
import Register from '@/components/Register.vue';

describe('Register.vue', () => {
  it('renders the registration form', () => {
    const wrapper = shallowMount(Register);
    expect(wrapper.find('h2').text()).toBe('Register');
  });

  it('registers a new user', async () => {
    const mockRouter = {
      push: jest.fn()
    };

    const wrapper = shallowMount(Register, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
    
    wrapper.setData({ username: 'user1', email: 'user1@example.com', birthdate: '2000-01-01', password: 'password' });

    await wrapper.find('button').trigger('click');

    const users = JSON.parse(localStorage.getItem('users'));
    expect(users).toHaveLength(1);
    expect(users[0].username).toBe('user1');
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
});