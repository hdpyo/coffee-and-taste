import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import {
  clearLoginFields, logout, requestLogin, updateLoginFields,
} from './store';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

export default function LoginFormContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = useSelector((state) => state.loginFields);
  const accessToken = useSelector((state) => state.accessToken);

  const handleChange = ({ name, value }) => {
    dispatch(updateLoginFields({ name, value }));
  };

  const handleSubmit = () => {
    dispatch(requestLogin());
    navigate(-1);
  };

  const handleClickLogout = () => {
    dispatch(logout());
    dispatch(clearLoginFields());
  };

  return (
    <div>
      {accessToken ? (
        <LogoutForm onClick={handleClickLogout} />
      ) : (
        <LoginForm
          loginFields={{ email, password }}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
