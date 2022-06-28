import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './LoginPage';

jest.mock('react-redux');

describe('LoginPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: 'tester@example.com',
        password: 'tester',
      },
    }));
  });

  function renderLoginPage() {
    return render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
  }

  it('renders title ', () => {
    const { container } = renderLoginPage();

    expect(container).toHaveTextContent('Login');
  });
});
