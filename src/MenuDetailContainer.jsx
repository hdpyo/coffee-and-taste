import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initializeMenuQuantity,
  loadMenu,
  menuQuantityMinusOne,
  menuQuantityPlusOne,
  requestAddToCart,
  requestSingleOrder,
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

  const accessToken = useSelector((state) => state.accessToken);
  const menuQuantity = useSelector((state) => state.menuQuantity);

  useEffect(() => {
    dispatch(loadMenu(menuId));
  }, []);

  useEffect(() => {
    dispatch(initializeMenuQuantity());
  }, []);

  const handleClickAddToCart = () => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    if (window.confirm('이 메뉴를 장바구니에 담으시겠습니까?')) {
      dispatch(requestAddToCart())
        .then(
          () => navigate('/cart'),
        );
    }
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

  const handleClickOrder = () => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    // TODO : 장바구니에 담지 않고 바로 주문하기
    if (window.confirm('주문하시겠습니까?')) {
      dispatch(requestSingleOrder()).then(
        () => navigate('/'),
      );
    }
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
        onClickOrder={handleClickOrder}
      />
    </MenuDetailStyle>
  );
}
