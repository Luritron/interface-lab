import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';

describe('Login.vue', () => {
  it('renders the login form', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.find('h2').text()).toBe('Login');
  });

  it('logs in a user with correct credentials', async () => {
    const users = [{ id: 1, username: 'user1', password: 'password' }];
    localStorage.setItem('users', JSON.stringify(users));

    const mockRouter = {
      push: jest.fn()
    };
    const mockStore = {
      dispatch: jest.fn()
    };

    const wrapper = shallowMount(Login, {
      global: {
        mocks: {
          $router: mockRouter,
          $store: mockStore
        }
      }
    });

    wrapper.setData({ username: 'user1', password: 'password' });

    await wrapper.find('button').trigger('click');

    expect(mockStore.dispatch).toHaveBeenCalledWith('login', users[0]);
    expect(mockRouter.push).toHaveBeenCalledWith('/todos');
  });

  it('shows an alert with incorrect credentials', async () => {
    localStorage.setItem('users', JSON.stringify([]));

    const mockRouter = {
      push: jest.fn()
    };
    const mockStore = {
      dispatch: jest.fn()
    };
    
    window.alert = jest.fn();

    const wrapper = shallowMount(Login, {
      global: {
        mocks: {
          $router: mockRouter,
          $store: mockStore
        }
      }
    });

    wrapper.setData({ username: 'wrongUser', password: 'wrongPassword' });

    await wrapper.find('button').trigger('click');

    expect(mockStore.dispatch).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid username or password.');
  });
});