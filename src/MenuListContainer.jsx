import styled from '@emotion/styled';

import { useLocation, useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadMenuList } from './store';

import MenuList from './MenuList';

const MenuContainerStyle = styled.div({
  margin: '40px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridGap: '1rem',
});

export default function MenuListContainer() {
  const { menuGroupId } = useParams();

  const dispatch = useDispatch();

  const selectedCategory = useLocation().state.categoryId;

  useEffect(() => {
    dispatch(loadMenuList(menuGroupId));
  }, [menuGroupId]);

  const menus = useSelector((state) => state.menus);

  return (
    <MenuContainerStyle>
      <MenuList menus={menus} selectedCategory={selectedCategory} />
    </MenuContainerStyle>
  );
}
