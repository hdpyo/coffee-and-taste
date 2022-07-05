import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadMenu } from './store';

import MenuDetail from './MenuDetail';

const MenuDetailStyle = styled.div({
  width: '700px',
  margin: '0 auto',
});

export default function MenuDetailContainer() {
  const { menuId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMenu(menuId));
  }, []);

  const menu = useSelector((state) => state.menu);

  return (
    <MenuDetailStyle>
      <MenuDetail menu={menu} />
    </MenuDetailStyle>
  );
}
