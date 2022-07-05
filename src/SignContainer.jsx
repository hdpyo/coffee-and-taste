import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import { TiShoppingCart } from 'react-icons/ti';
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';

import { clearLoginFields, logout } from './store';

const SignContainerStyle = styled.div({

});

const List = styled.ul({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: '0 auto',
  width: '95%',
  height: '3rem',
});

const Item = styled.li({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: '3rem',
  minWidth: '6rem',
  padding: '0 .5rem',
  borderLeft: '3px solid #321414',
  '&:first-child': {
    borderLeft: 'none',
  },
  '& a': {
    color: '#555555',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '1.5rem',
    transition: 'border-bottom .08s',
    '&:hover': {
      color: '#000',
      fontWeight: '700',
      borderBottom: '3px solid green',
    },
    '& svg': {
      marginLeft: '0.3rem',
    },
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
    <SignContainerStyle>
      <List>
        <Item>
          {
            accessToken ? (
              <Link to="/myPage">
                OOO 님
              </Link>
            ) : (
              <Link to="/signUp">
                Sign Up
                <FiUserPlus size="1.5rem" />
              </Link>
            )
          }
        </Item>
        {
          accessToken ? (
            <Item>
              <Link to="/cart">
                Cart
                <TiShoppingCart size="1.5rem" />
              </Link>
            </Item>
          ) : null
        }
        <Item>
          {
            accessToken ? (
              <Link to="/logout" onClick={handleClickLogout}>
                Logout
                <FiLogOut size="1.5rem" />
              </Link>
            ) : (
              <Link to="/login">
                Login
                <FiLogIn size="1.5rem" />
              </Link>
            )
          }
        </Item>
      </List>
    </SignContainerStyle>
  );
}
