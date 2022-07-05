import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import styled from '@emotion/styled';

import { BsFillDashCircleFill, BsPlusCircleFill } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
import {
  initializeMenuQuantity, menuQuantityMinusOne, menuQuantityPlusOne, requestAddToCart,
} from './store';

const MenuImage = styled.div({
  width: '250px',
  height: '250px',
  margin: '30px auto',
  overflow: 'hidden',
  borderRadius: '50%',
  '& img': {
    width: '100%',
    height: '100%',
    transition: '1s',
    '&:hover': {
      transform: 'scale(1.2, 1.2)',
    },
  },
});

const MenuName = styled.h1({
  textAlign: 'center',
  fontSize: '1.7rem',
  fontWeight: '500',
  paddingBottom: '.5rem',
});

const MenuEnglishName = styled.h2({
  textAlign: 'center',
  fontSize: '1.3rem',
  color: 'rgba(179, 179, 179)',
  paddingBottom: '.5rem',
});

const MenuDescription = styled.p({
  margin: '15px 0',
  fontSize: '1.2rem',
  paddingTop: '.5rem',
  lineHeight: '1.6rem',
  '& span': {
    wordBreak: 'keep-all',
  },
});

const MenuPrice = styled.h3({
  textAlign: 'right',
  margin: '10px 0',
  fontSize: '2rem',
  fontWeight: '500',
  padding: '1rem 0',
});

const MenuQuantity = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Quantity = styled.span({
  fontSize: '2rem',
  padding: '0.5rem 2rem',
  margin: '0 1rem',
});

const ButtonDiv = styled.div({
  margin: '30px 0',
  display: 'flex',
  justifyContent: 'space-around',
});

const OrderButton = styled.button({
  width: '30%',
  height: '3rem',
  padding: '0.5rem',
  fontSize: '1.5rem',
  color: '#00704a',
  background: 'transparent',
  border: '2px solid #00704a',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color .7s, color .7s',
  '&:hover': {
    color: '#fff',
    backgroundColor: '#00704a',
    textDecoration: 'underline',
  },
});

const CartButton = styled.button({
  width: '30%',
  height: '3rem',
  padding: '0.5rem',
  fontSize: '1.5rem',
  color: '#00704a',
  background: 'transparent',
  border: '2px solid #00704a',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color .7s, color .7s',
  '&:hover': {
    color: '#fff',
    backgroundColor: '#00704a',
    textDecoration: 'underline',
  },
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
      <MenuImage>
        <img src={`https://coffee-and-taste.kro.kr${imagePath}`} alt={name} />
      </MenuImage>
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
