import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useEffect } from 'react';

import SignContainer from './SignContainer';
import CategoryContainer from './CategoryContainer';
import MenuGroupContainer from './MenuGroupContainer';
import MenuListContainer from './MenuListContainer';
import MenuDetailContainer from './MenuDetailContainer';
import LoginPage from './LoginPage';

import { loadCategories, selectCategory } from './store';

import { DEFAULT_SELECTED_CATEGORY_IS_NONE } from './constants';

import logo from './images/logo.png';

const Container = styled.div({
  margin: '0 auto',
  width: '70%',
});

const Header = styled.header({
  width: '100%',
  background: 'beige 100%',
});

const LogoContainer = styled.div({
  margin: '0 auto',
  width: '75%',
  '& a': {
    fontSize: '1.8rem',
    color: '#555555',
    textDecoration: 'none',
  },
  padding: '1rem 0',
  textAlign: 'center',
});

const Logo = styled.img({
  margin: '0 auto',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
});

const ContentContainer = styled.div({
  marginTop: '50px',
  height: 'auto',
});

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  const resetSelectedCategory = () => {
    dispatch(selectCategory(DEFAULT_SELECTED_CATEGORY_IS_NONE));
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header>
        <SignContainer />
        <LogoContainer>
          <Link to="/" onClick={resetSelectedCategory}>
            <Logo src={logo} alt="coffee-and-taste logo" />
          </Link>
        </LogoContainer>
        <CategoryContainer />
      </Header>
      <Container>
        <ContentContainer>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/categories/:categoryId/menu-groups" element={<MenuGroupContainer />} />
            <Route path="/menu-groups/:menuGroupId" element={<MenuListContainer />} />
            <Route path="/menu-groups/:menuGroupId/menus/:menuId" element={<MenuDetailContainer />} />
          </Routes>
        </ContentContainer>
      </Container>
    </BrowserRouter>
  );
}
