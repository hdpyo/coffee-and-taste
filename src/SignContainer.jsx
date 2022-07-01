import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import { clearLoginFields, logout } from './store';

const List = styled.ul({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Item = styled.li({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: '3rem',
  minWidth: '6rem',
  margin: '0 0.5rem',
  '& a': {
    color: '#555555',
    textDecoration: 'none',
  },
});

export default function SignContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.accessToken);

  const handleClickLogout = () => {
    dispatch(logout());
    dispatch(clearLoginFields());
    navigate('/login');
  };

  return (
    <div>
      <List>
        <Item>
          {
            accessToken ? (
              <h1>OOO 님</h1>
            ) : (
              <Link to="/signUp">SignUp</Link>
            )
          }
        </Item>
        {
          accessToken ? (
            <Item>
              <Link to="/cart">Cart</Link>
            </Item>
          ) : null
        }
        <Item>
          {
            accessToken ? (
              <Link to="/logout" onClick={handleClickLogout}>Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )
          }
        </Item>
      </List>
    </div>
  );
}
