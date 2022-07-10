import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initializeMenuQuantity, loadMenu, menuQuantityMinusOne, menuQuantityPlusOne, requestAddToCart,
} from './store';

import MenuDetail from './MenuDetail';

const MenuDetailStyle = styled.div({
  width: '700px',
  margin: '0 auto', // TODO : grid 로 수정?
});

export default function MenuDetailContainer() {
  const { menuId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuQuantity = useSelector((state) => state.menuQuantity);

  useEffect(() => {
    dispatch(loadMenu(menuId));
  }, []);

  useEffect(() => {
    dispatch(initializeMenuQuantity());
  }, []);

  const handleClickAddToCart = () => {
    dispatch(requestAddToCart())
      .then(
        () => navigate('/cart'),
      );
  };

  const handleClickPlusOne = () => {
    dispatch(menuQuantityPlusOne());
  };

  const handleClickMinusOne = (currentQuantity) => {
    if (currentQuantity === 1) {
      return;
    }
    dispatch(menuQuantityMinusOne());
  };

  const menu = useSelector((state) => state.menu);

  return (
    <MenuDetailStyle>
      <MenuDetail
        menu={menu}
        menuQuantity={menuQuantity}
        onClickAddCart={handleClickAddToCart}
        onClickIncreaseQuantity={handleClickPlusOne}
        onClickDecreaseQuantity={handleClickMinusOne}
      />
    </MenuDetailStyle>
  );
}
