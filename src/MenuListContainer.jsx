import styled from '@emotion/styled';

import { useLocation, useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadMenuList } from './store';

import MenuList from './MenuList';

const MenuContainerStyle = styled.div({
  // margin: '0 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridGap: '1rem', // TODO : 유효하지 않은 값 : 수정 필요
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
