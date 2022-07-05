import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import styled from '@emotion/styled';

import { BsFillDashCircleFill, BsPlusCircleFill } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
import {
  initializeMenuQuantity, menuQuantityMinusOne, menuQuantityPlusOne, requestAddToCart,
} from './store';

const MenuImage = styled.div(
  ({ url }) => ({
    margin: '30px auto',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    ...(url && {
      background: `url("https://coffee-and-taste.kro.kr${url}") center/100% no-repeat`,
    }),
  }),
);

const MenuName = styled.h1({
  fontSize: '1.7rem',
  fontWeight: '500',
  paddingBottom: '.5rem',
});

const MenuEnglishName = styled.h2({
  fontSize: '1.3rem',
  color: 'rgba(179, 179, 179)',
  paddingBottom: '.5rem',
});

const MenuDescription = styled.p({
  margin: '15px 0',
  fontSize: '1.2rem',
  paddingTop: '.5rem',
  lineHeight: '1.6rem',
});

const MenuPrice = styled.h3({
  margin: '10px 0',
  fontSize: '1.7rem',
  fontWeight: '500',
  padding: '1rem 0',
});

const MenuQuantity = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& *': {
    marginRight: '20px',
  },
});

const Quantity = styled.span({
  fontSize: '2rem',
  padding: '0.5rem 1rem',
});

const ButtonDiv = styled.div({
  margin: '30px 0',
  display: 'flex',
  justifyContent: 'space-around',
});

const OrderButton = styled.button({
  padding: '0.5rem',
  width: '30%',
  height: '3rem',
  fontSize: '1.5rem',
  color: 'white',
  borderRadius: '30px',
  backgroundColor: '#006633',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
});

const CartButton = styled.button({
  padding: '0.5rem',
  width: '30%',
  height: '3rem',
  fontSize: '1.5rem',
  color: 'white',
  borderRadius: '30px',
  backgroundColor: '#006633',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
});

export default function MenuDetail({
  menu: {
    description, englishName, imagePath, name, price,
  },
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuQuantity = useSelector((state) => state.menuQuantity);

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

  const handleClickMinusOne = () => {
    dispatch(menuQuantityMinusOne());
  };

  return (
    <>
      <MenuImage url={imagePath} />
      <MenuName>{name}</MenuName>
      <MenuEnglishName>{englishName}</MenuEnglishName>
      <hr />
      <MenuDescription>
        {description ? description.split('\n').map((line) => (
          <span>
            {line}
            <br />
          </span>
        )) : null}
      </MenuDescription>
      <MenuPrice>
        {price ? price.toLocaleString('ko-KR') : null}
        원
      </MenuPrice>
      <MenuQuantity>
        <BsFillDashCircleFill size="40" onClick={handleClickMinusOne} />
        <Quantity>{menuQuantity}</Quantity>
        <BsPlusCircleFill size="40" onClick={handleClickPlusOne} />
      </MenuQuantity>
      <ButtonDiv>
        <OrderButton>주문하기</OrderButton>
        <CartButton onClick={handleClickAddToCart}>장바구니에 담기</CartButton>
      </ButtonDiv>
    </>
  );
}
